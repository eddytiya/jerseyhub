const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../model/orderModel");
const PaymentAttempt = require("../model/PaymentAttempt");
const PaymentWebhookEvent = require("../model/PaymentWebhookEvent");
const PaymentRecovery = require("../model/PaymentRecovery");

const safeSignatureMatch = (body, signature) => {
    if (!signature || !process.env.RAZORPAY_WEBHOOK_SECRET) return false;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET).update(body).digest("hex");
    const receivedBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    return receivedBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(receivedBuffer, expectedBuffer);
};

const enqueueRecovery = async (attempt, paymentId, reason) => {
    if (!attempt) return;
    await PaymentRecovery.findOneAndUpdate(
        { paymentAttemptId: attempt._id },
        { $setOnInsert: { razorpayPaymentId: paymentId, reason, status: "pending", nextAttemptAt: new Date() } },
        { upsert: true }
    );
    attempt.status = "recovery_required";
    attempt.failureReason = reason;
    await attempt.save();
};

const processCapturedPayment = async (payment) => {
    const attempt = await PaymentAttempt.findOne({ razorpayOrderId: payment.order_id });
    const order = await Order.findOne({ razorpayOrderId: payment.order_id });

    if (!attempt) return;
    attempt.razorpayPaymentId = payment.id;
    attempt.lastWebhookAt = new Date();

    if (Number(payment.amount) !== attempt.amount || payment.currency !== attempt.currency) {
        await enqueueRecovery(attempt, payment.id, "Captured payment amount or currency does not match the payment attempt");
        return;
    }

    if (order) {
        order.razorpayPaymentId = payment.id;
        order.paymentStatus = "Paid";
        await order.save();
        attempt.orderId = order._id;
        attempt.status = "order_created";
        await attempt.save();
        await PaymentRecovery.updateOne({ paymentAttemptId: attempt._id }, { status: "resolved", resolvedOrderId: order._id });
    } else {
        attempt.status = "captured";
        await attempt.save();
        await enqueueRecovery(attempt, payment.id, "Payment captured before order creation completed");
    }
};

const razorpayWebhook = async (req, res) => {
    const rawBody = req.body;
    const signature = req.get("x-razorpay-signature");
    if (!Buffer.isBuffer(rawBody) || !safeSignatureMatch(rawBody, signature)) {
        return res.status(400).json({ message: "Invalid webhook signature" });
    }

    let event;
    try {
        event = JSON.parse(rawBody.toString("utf8"));
    } catch {
        return res.status(400).json({ message: "Invalid webhook payload" });
    }
    const eventId = req.get("x-razorpay-event-id") || crypto.createHash("sha256").update(rawBody).digest("hex");
    let eventRecord;
    try {
        eventRecord = await PaymentWebhookEvent.create({ eventId, eventType: event.event, status: "processing" });
    } catch (error) {
        if (error.code === 11000) {
            eventRecord = await PaymentWebhookEvent.findOne({ eventId });
            if (eventRecord.status !== "failed") {
                return res.status(200).json({ received: true, duplicate: true });
            }
            eventRecord.status = "processing";
            eventRecord.error = "";
            await eventRecord.save();
        } else {
            throw error;
        }
    }

    const payment = event.payload?.payment?.entity;
    const refund = event.payload?.refund?.entity;

    try {
        if (event.event === "payment.captured" && payment) {
            await processCapturedPayment(payment);
        } else if (event.event === "payment.failed" && payment) {
            await PaymentAttempt.updateOne(
                { razorpayOrderId: payment.order_id },
                { status: "failed", razorpayPaymentId: payment.id, failureReason: payment.error_description || "Payment failed", lastWebhookAt: new Date() }
            );
        } else if (event.event === "refund.processed" && refund) {
            const attempt = await PaymentAttempt.findOne({ razorpayPaymentId: refund.payment_id });
            if (attempt) {
                attempt.status = "refunded";
                await attempt.save();
                await Order.updateOne({ _id: attempt.orderId }, { paymentStatus: "Refunded" });
                await PaymentRecovery.updateOne({ paymentAttemptId: attempt._id }, { status: "refunded" });
            }
        }
        eventRecord.status = "processed";
        eventRecord.processedAt = new Date();
        await eventRecord.save();
    } catch (error) {
        eventRecord.status = "failed";
        eventRecord.error = error.message;
        await eventRecord.save();
        throw error;
    }

    return res.status(200).json({ received: true });
};

const reconcilePayment = async (req, res) => {
    const attempt = await PaymentAttempt.findOne({ razorpayOrderId: req.params.razorpayOrderId });
    if (!attempt) return res.status(404).json({ message: "Payment attempt not found" });
    const result = await razorpay.orders.fetchPayments(attempt.razorpayOrderId);
    const payment = result.items?.find((item) => ["authorized", "captured"].includes(item.status));
    if (!payment) return res.status(409).json({ message: "No successful payment found" });
    await processCapturedPayment(payment);
    return res.json(await PaymentAttempt.findById(attempt._id));
};

const refundOrder = async (req, res) => {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.paymentMethod !== "Razorpay" || order.paymentStatus !== "Paid" || !order.razorpayPaymentId) {
        return res.status(409).json({ message: "Only paid Razorpay orders can be refunded" });
    }
    const refund = await razorpay.payments.refund(order.razorpayPaymentId, {
        amount: Math.round(order.totalAmount * 100),
        notes: { orderId: String(order._id), reason: req.body.reason || "Admin refund" },
    });
    order.paymentStatus = "RefundPending";
    await order.save();
    await PaymentAttempt.updateOne({ razorpayPaymentId: order.razorpayPaymentId }, { status: "refund_pending" });
    res.status(202).json(refund);
};

module.exports = { razorpayWebhook, reconcilePayment, refundOrder };
