const mongoose = require("mongoose");
const Jersey = require("../model/jerseyModel");
const InventoryReservation = require("../model/InventoryReservation");
const InventoryMovement = require("../model/InventoryMovement");

const reserveInventory = async ({ cartItems, userId, idempotencyKey }) => {
    const session = await mongoose.startSession();
    try {
        await session.withTransaction(async () => {
            for (const item of cartItems) {
                const jersey = await Jersey.findById(item.jerseyId._id).session(session);
                const variant = jersey.variants?.length
                    ? jersey.variants.find((entry) => entry.size === item.selectedSize && entry.active)
                    : null;
                const available = variant
                    ? variant.stock - variant.reserved
                    : jersey.stock - (jersey.reservedStock || 0);
                if (available < item.quantity) {
                    const error = new Error(`${jersey.jerseyName} no longer has enough stock.`);
                    error.statusCode = 409;
                    throw error;
                }
                if (variant) variant.reserved += item.quantity;
                else jersey.reservedStock = (jersey.reservedStock || 0) + item.quantity;
                await jersey.save({ session });
                await InventoryReservation.create([{
                    userId, idempotencyKey, jerseyId: jersey._id,
                    variantId: variant?._id || null, size: variant?.size || item.selectedSize || "",
                    sku: variant?.sku || item.sku || "", quantity: item.quantity,
                    expiresAt: new Date(Date.now() + Number(process.env.INVENTORY_RESERVATION_MINUTES || 15) * 60 * 1000),
                }], { session });
            }
        });
    } finally {
        await session.endSession();
    }
};

const releaseReservations = async (filter) => {
    const reservations = await InventoryReservation.find({ ...filter, status: "active" });
    for (const reservation of reservations) {
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                const jersey = await Jersey.findById(reservation.jerseyId).session(session);
                if (jersey) {
                    const variant = reservation.variantId ? jersey.variants.id(reservation.variantId) : null;
                    if (variant) variant.reserved = Math.max(0, variant.reserved - reservation.quantity);
                    else jersey.reservedStock = Math.max(0, (jersey.reservedStock || 0) - reservation.quantity);
                    await jersey.save({ session });
                    await InventoryMovement.create([{
                        jerseyId: jersey._id, variantId: variant?._id || null, sku: reservation.sku,
                        size: reservation.size, type: "release", quantity: reservation.quantity,
                        stockBefore: variant?.stock ?? jersey.stock, stockAfter: variant?.stock ?? jersey.stock,
                        reason: "Checkout reservation expired or was released",
                    }], { session });
                }
                reservation.status = "released";
                await reservation.save({ session });
            });
        } finally { await session.endSession(); }
    }
};

module.exports = { reserveInventory, releaseReservations };
