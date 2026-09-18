const mongoose = require("mongoose");

const inventoryReservationSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    idempotencyKey: { type: String, required: true, index: true },
    jerseyId: { type: mongoose.Schema.Types.ObjectId, ref: "Jersey", required: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, default: null },
    size: { type: String, default: "" },
    sku: { type: String, default: "" },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ["active", "consumed", "released"], default: "active", index: true },
    expiresAt: { type: Date, required: true, index: true },
}, { timestamps: true });

inventoryReservationSchema.index({ userId: 1, idempotencyKey: 1, jerseyId: 1, size: 1 }, { unique: true });

module.exports = mongoose.model("InventoryReservation", inventoryReservationSchema);
