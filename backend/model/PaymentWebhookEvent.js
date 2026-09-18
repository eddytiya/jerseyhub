const mongoose = require("mongoose");

const paymentWebhookEventSchema = new mongoose.Schema({
    eventId: { type: String, required: true, unique: true },
    eventType: { type: String, required: true },
    status: { type: String, enum: ["processing", "processed", "failed"], default: "processing" },
    processedAt: { type: Date, default: null },
    error: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("PaymentWebhookEvent", paymentWebhookEventSchema);
