const razorpay = require("../config/razorpay");
const { calculateCheckout } = require("../services/checkoutPricing");
const PaymentAttempt = require("../model/PaymentAttempt");
const crypto = require("crypto");
const { reserveInventory, releaseReservations } = require("../services/inventoryReservation");

const createRazorpayOrder = async (req,res)=>{

    let reservationContext = null;

    try{

        const isGuest = !req.session.userId;
        const userId = req.session.userId || req.session.guestId;
        const { buyNow, couponCode, redeemPoints, deliveryInfo } = req.body;
        const idempotencyKey = req.get("Idempotency-Key") || req.body.idempotencyKey || crypto.randomUUID();
        const existing = await PaymentAttempt.findOne({ userId, idempotencyKey });
        if (existing) {
            return res.status(200).json({
                id: existing.razorpayOrderId,
                amount: existing.amount,
                currency: existing.currency,
                idempotencyKey,
                breakdown: existing.breakdown,
            });
        }

        const pricing = await calculateCheckout({
            userId, isGuest, buyNow, couponCode, redeemPoints
        });
        const { totalAmount } = pricing;

        if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
            return res.status(400).json({ message: "Invalid order total" });
        }

        await reserveInventory({ cartItems: pricing.cartItems, userId, idempotencyKey });
        reservationContext = { userId, idempotencyKey };

        const options={

            amount: Math.round(totalAmount * 100),

            currency:"INR",

            receipt:`receipt_${Date.now()}`

        };

        const order=await razorpay.orders.create(options);

        await PaymentAttempt.create({
            userId,
            idempotencyKey,
            razorpayOrderId: order.id,
            amount: order.amount,
            currency: order.currency,
            checkout: { buyNow: Boolean(buyNow), couponCode, redeemPoints, deliveryInfo },
            breakdown: {
                subtotal: pricing.subtotal,
                discountAmount: pricing.discountAmount,
                pointsRedeemed: pricing.pointsRedeemedAmount,
                merchandiseTotal: pricing.merchandiseTotal,
                shippingAmount: pricing.shippingAmount,
                taxAmount: pricing.taxAmount,
                taxRate: pricing.taxRate,
                totalAmount: pricing.totalAmount,
            },
        });

        res.status(200).json({ ...order, idempotencyKey, breakdown: pricing });

    }

    catch(err){

        if (reservationContext) {
            await releaseReservations(reservationContext).catch(() => {});
        }

        res.status(err.statusCode || 500).json({

            message:err.message

        });

    }

};

module.exports={

    createRazorpayOrder

};
