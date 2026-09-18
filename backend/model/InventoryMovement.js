const mongoose = require("mongoose");

const inventoryMovementSchema = new mongoose.Schema({
    jerseyId: { type: mongoose.Schema.Types.ObjectId, ref: "Jersey", required: true, index: true },
    variantId: { type: mongoose.Schema.Types.ObjectId, default: null },
    sku: { type: String, default: "", index: true },
    size: { type: String, default: "" },
    type: { type: String, enum: ["sale", "restock", "adjustment", "reservation", "release", "return"], required: true },
    quantity: { type: Number, required: true },
    stockBefore: { type: Number, required: true },
    stockAfter: { type: Number, required: true },
    reason: { type: String, default: "" },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null },
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "user", default: null },
}, { timestamps: true });

inventoryMovementSchema.index({ jerseyId: 1, createdAt: -1 });

module.exports = mongoose.model("InventoryMovement", inventoryMovementSchema);
