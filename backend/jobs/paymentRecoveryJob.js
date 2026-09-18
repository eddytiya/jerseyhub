const cron = require("node-cron");
const razorpay = require("../config/razorpay");
const Order = require("../model/orderModel");
const PaymentAttempt = require("../model/PaymentAttempt");
const PaymentRecovery = require("../model/PaymentRecovery");

const recoverPayment = async (task) => {
    task.status = "processing";
    task.retryCount += 1;
    await task.save();
    try {
        const attempt = await PaymentAttempt.findById(task.paymentAttemptId);
        if (!attempt) throw new Error("Payment attempt no longer exists");
        const order = await Order.findOne({ razorpayOrderId: attempt.razorpayOrderId });
        if (order) {
            attempt.orderId = order._id;
            attempt.status = "order_created";
            await attempt.save();
            task.status = "resolved";
            task.resolvedOrderId = order._id;
            await task.save();
            return;
        }

        const payment = await razorpay.payments.fetch(task.razorpayPaymentId);
        if (payment.status !== "captured") {
            throw new Error(`Payment is ${payment.status}; manual review required`);
        }
        await razorpay.payments.refund(task.razorpayPaymentId, {
            amount: attempt.amount,
            notes: { reason: "Automatic refund: payment captured without an order" },
        });
        attempt.status = "refund_pending";
        await attempt.save();
        task.status = "refund_pending";
        await task.save();
    } catch (error) {
        task.status = task.retryCount >= 5 ? "failed" : "pending";
        task.lastError = error.message;
        task.nextAttemptAt = new Date(Date.now() + Math.min(task.retryCount * 5, 30) * 60 * 1000);
        await task.save();
    }
};

const runPaymentRecovery = async () => {
    const graceMinutes = Number(process.env.PAYMENT_RECOVERY_GRACE_MINUTES || 15);
    const tasks = await PaymentRecovery.find({
        status: "pending",
        nextAttemptAt: { $lte: new Date() },
        createdAt: { $lte: new Date(Date.now() - graceMinutes * 60 * 1000) },
    }).limit(20);
    for (const task of tasks) await recoverPayment(task);
};

const startPaymentRecoveryJob = () => {
    if (process.env.PAYMENT_RECOVERY_ENABLED !== "true") return;
    cron.schedule("*/5 * * * *", () => runPaymentRecovery().catch((error) => {
        console.error("Payment recovery job failed:", error.message);
    }));
};

module.exports = { startPaymentRecoveryJob, runPaymentRecovery };
