const Coupon = require('../model/Coupon');

/* ==========================================
            ADMIN - CREATE COUPON
========================================== */

const createCoupon = async (req, res) => {

    try {

        const coupon = await Coupon.create(req.body);

        res.status(201).json(coupon);

    }

    catch (err) {

        res.status(400).json({

            message: err.code === 11000

                ? "A Coupon With This Code Already Exists"

                : err.message

        });

    }

};

/* ==========================================
            ADMIN - GET ALL COUPONS
========================================== */

const getAllCoupons = async (req, res) => {

    try {

        const coupons = await Coupon.find().sort({ createdAt: -1 });

        res.status(200).json(coupons);

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

};

/* ==========================================
            ADMIN - UPDATE COUPON
========================================== */

const updateCoupon = async (req, res) => {

    try {

        const coupon = await Coupon.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new: true, runValidators: true }

        );

        if (!coupon) {

            return res.status(404).json({ message: "Coupon Not Found" });

        }

        res.status(200).json(coupon);

    }

    catch (err) {

        res.status(400).json({ message: err.message });

    }

};

/* ==========================================
            ADMIN - DELETE COUPON
========================================== */

const deleteCoupon = async (req, res) => {

    try {

        await Coupon.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Coupon Deleted" });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

};

/* ==========================================
    SHARED VALIDATION (USED BY CHECKOUT TOO)
========================================== */

const evaluateCoupon = async (code, orderAmount) => {

    if (!code) {

        return { valid: false, message: "No Coupon Code Provided" };

    }

    const coupon = await Coupon.findOne({

        code: String(code).toUpperCase().trim()

    });

    if (!coupon || !coupon.active) {

        return { valid: false, message: "Invalid Coupon Code" };

    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {

        return { valid: false, message: "This Coupon Has Expired" };

    }

    if (

        coupon.usageLimit !== null &&

        coupon.usedCount >= coupon.usageLimit

    ) {

        return { valid: false, message: "This Coupon Has Reached Its Usage Limit" };

    }

    if (orderAmount < coupon.minOrderAmount) {

        return {

            valid: false,

            message: `Minimum Order Amount Of ₹${coupon.minOrderAmount} Required For This Coupon`

        };

    }

    let discountAmount = coupon.discountType === 'percentage'

        ? (orderAmount * coupon.discountValue) / 100

        : coupon.discountValue;

    if (coupon.maxDiscountAmount !== null) {

        discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);

    }

    discountAmount = Math.min(discountAmount, orderAmount);

    return {

        valid: true,

        coupon,

        discountAmount: Math.round(discountAmount)

    };

};

/* ==========================================
        CUSTOMER - VALIDATE COUPON
========================================== */

const validateCoupon = async (req, res) => {

    try {

        const { code, orderAmount } = req.body;

        const result = await evaluateCoupon(code, Number(orderAmount) || 0);

        if (!result.valid) {

            return res.status(400).json({ message: result.message });

        }

        res.status(200).json({

            message: "Coupon Applied Successfully",

            discountAmount: result.discountAmount,

            code: result.coupon.code

        });

    }

    catch (err) {

        res.status(500).json({ message: err.message });

    }

};

module.exports = {

    createCoupon,

    getAllCoupons,

    updateCoupon,

    deleteCoupon,

    validateCoupon,

    evaluateCoupon

};
