const mongoose = require("mongoose");
const Jersey = require("../model/jerseyModel");
const InventoryMovement = require("../model/InventoryMovement");

const adjustInventory = async (req, res) => {
    const { variantId, quantity, reason, type = "adjustment", supplierCost } = req.body;
    const delta = Number(quantity);
    if (!Number.isInteger(delta) || delta === 0) {
        return res.status(400).json({ message: "Quantity must be a non-zero integer" });
    }
    if (!reason?.trim()) return res.status(400).json({ message: "An adjustment reason is required" });

    const session = await mongoose.startSession();
    let jersey;
    try {
        await session.withTransaction(async () => {
            jersey = await Jersey.findById(req.params.id).session(session);
            if (!jersey) {
                const error = new Error("Jersey not found"); error.statusCode = 404; throw error;
            }
            const variant = jersey.variants.id(variantId);
            if (!variant) {
                const error = new Error("Variant not found"); error.statusCode = 404; throw error;
            }
            const before = variant.stock;
            if (before + delta < variant.reserved) {
                const error = new Error("Adjustment would reduce stock below reserved quantity"); error.statusCode = 409; throw error;
            }
            variant.stock += delta;
            if (supplierCost !== undefined) variant.supplierCost = Number(supplierCost);
            await jersey.save({ session });
            await InventoryMovement.create([{
                jerseyId: jersey._id,
                variantId: variant._id,
                sku: variant.sku,
                size: variant.size,
                type: type === "restock" ? "restock" : "adjustment",
                quantity: delta,
                stockBefore: before,
                stockAfter: variant.stock,
                reason: reason.trim(),
                actorId: req.session.userId,
            }], { session });
        });
        res.json(jersey);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    } finally {
        await session.endSession();
    }
};

const getInventoryLedger = async (req, res) => {
    const query = { jerseyId: req.params.id };
    if (req.query.variantId) query.variantId = req.query.variantId;
    const movements = await InventoryMovement.find(query)
        .sort({ createdAt: -1 })
        .limit(Math.min(Number(req.query.limit) || 100, 500))
        .populate("actorId", "uname email");
    res.json(movements);
};

module.exports = { adjustInventory, getInventoryLedger };
