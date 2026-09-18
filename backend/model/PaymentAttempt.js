const mongoose = require("mongoose");

const paymentAttemptSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    idempotencyKey: { type: String, required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, default: "" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
        type: String,
        enum: ["created", "authorized", "captured", "order_created", "failed", "recovery_required", "refund_pending", "refunded"],
        default: "created",
        index: true,
    },
    checkout: {
        buyNow: Boolean,
        couponCode: String,
        redeemPoints: Number,
        deliveryInfo: mongoose.Schema.Types.Mixed,
    },
    breakdown: mongoose.Schema.Types.Mixed,
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null },
    failureReason: { type: String, default: "" },
    lastWebhookAt: { type: Date, default: null },
}, { timestamps: true });

paymentAttemptSchema.index({ userId: 1, idempotencyKey: 1 }, { unique: true });
paymentAttemptSchema.index(
    { razorpayPaymentId: 1 },
    { unique: true, partialFilterExpression: { razorpayPaymentId: { $type: "string", $gt: "" } } }
);

module.exports = mongoose.model("PaymentAttempt", paymentAttemptSchema);
