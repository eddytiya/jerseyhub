const { calculateCheckout } = require("../services/checkoutPricing");

const getCheckoutQuote = async (req, res) => {
    try {
        const isGuest = !req.session.userId;
        const userId = req.session.userId || req.session.guestId;
        const pricing = await calculateCheckout({
            userId,
            isGuest,
            buyNow: req.body.buyNow,
            couponCode: req.body.couponCode,
            redeemPoints: req.body.redeemPoints,
        });
        res.json({
            subtotal: pricing.subtotal,
            discountAmount: pricing.discountAmount,
            pointsRedeemed: pricing.pointsRedeemedAmount,
            merchandiseTotal: pricing.merchandiseTotal,
            shippingAmount: pricing.shippingAmount,
            taxAmount: pricing.taxAmount,
            taxRate: pricing.taxRate,
            totalAmount: pricing.totalAmount,
            codAvailable: pricing.codAvailable,
            codUnavailableReason: pricing.codUnavailableReason,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

module.exports = { getCheckoutQuote };
