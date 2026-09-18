const Cart = require("../model/cartModel");
const User = require("../model/userModel");
const { evaluateCoupon } = require("../controller/couponController");
const { isPubliclyAvailable } = require("./catalogPublishing");

const money = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const getCommerceRules = () => ({
    freeShippingThreshold: Number(process.env.FREE_SHIPPING_THRESHOLD || 1499),
    standardShippingCharge: Number(process.env.STANDARD_SHIPPING_CHARGE || 99),
    gstRate: Number(process.env.GST_RATE || 5),
    codMaxAmount: Number(process.env.COD_MAX_AMOUNT || 5000),
});

const calculateCheckout = async ({ userId, isGuest, buyNow, couponCode, redeemPoints }) => {
    const cartItems = await Cart.find({ userId, buyNow: buyNow ? true : false }).populate("jerseyId");
    if (cartItems.length === 0) {
        const error = new Error("Cart Is Empty"); error.statusCode = 400; throw error;
    }
    if (cartItems.some((item) => !item.jerseyId)) {
        const error = new Error("Jersey Not Found"); error.statusCode = 404; throw error;
    }
    if (cartItems.some((item) => !isPubliclyAvailable(item.jerseyId))) {
        const error = new Error("A product in your cart is no longer available"); error.statusCode = 409; throw error;
    }
    const subtotal = cartItems.reduce((total, item) => total + item.jerseyId.price * item.quantity, 0);
    let discountAmount = 0;
    let appliedCouponCode = "";
    if (couponCode) {
        const couponResult = await evaluateCoupon(couponCode, subtotal);
        if (!couponResult.valid) {
            const error = new Error(couponResult.message); error.statusCode = 400; throw error;
        }
        discountAmount = couponResult.discountAmount;
        appliedCouponCode = couponResult.coupon.code;
    }
    let redeemingUser = null;
    if (!isGuest) redeemingUser = await User.findById(userId);
    const requestedPoints = Number(redeemPoints) || 0;
    let pointsRedeemedAmount = 0;
    if (requestedPoints > 0) {
        if (!redeemingUser) {
            const error = new Error("Please Login To Redeem Points"); error.statusCode = 400; throw error;
        }
        if (requestedPoints > redeemingUser.loyaltyPoints) {
            const error = new Error("You Don't Have Enough Points"); error.statusCode = 400; throw error;
        }
        pointsRedeemedAmount = Math.min(requestedPoints, subtotal - discountAmount);
    }
    const rules = getCommerceRules();
    const merchandiseTotal = money(subtotal - discountAmount - pointsRedeemedAmount);
    const shippingAmount = merchandiseTotal >= rules.freeShippingThreshold ? 0 : rules.standardShippingCharge;
    const taxAmount = money(merchandiseTotal - merchandiseTotal / (1 + rules.gstRate / 100));
    const totalAmount = money(merchandiseTotal + shippingAmount);

    return {
        cartItems, subtotal, discountAmount, appliedCouponCode, pointsRedeemedAmount, redeemingUser,
        merchandiseTotal, shippingAmount, taxAmount, taxRate: rules.gstRate, totalAmount,
        codAvailable: totalAmount <= rules.codMaxAmount,
        codUnavailableReason: totalAmount > rules.codMaxAmount
            ? `Cash on delivery is available for orders up to ₹${rules.codMaxAmount}.`
            : "",
    };
};

module.exports = { calculateCheckout, getCommerceRules };
