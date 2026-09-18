const mongoose = require("mongoose");

const paymentRecoverySchema = new mongoose.Schema({
    paymentAttemptId: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentAttempt", required: true, unique: true },
    razorpayPaymentId: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "processing", "resolved", "refund_pending", "refunded", "failed"], default: "pending", index: true },
    retryCount: { type: Number, default: 0 },
    nextAttemptAt: { type: Date, default: Date.now, index: true },
    lastError: { type: String, default: "" },
    resolvedOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null },
}, { timestamps: true });

module.exports = mongoose.model("PaymentRecovery", paymentRecoverySchema);
