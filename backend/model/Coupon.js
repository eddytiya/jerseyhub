const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    discountType: {
        type: String,
        enum: ['percentage', 'flat'],
        required: true
    },

    discountValue: {
        type: Number,
        required: true
    },

    minOrderAmount: {
        type: Number,
        default: 0
    },

    maxDiscountAmount: {
        type: Number,
        default: null
    },

    expiresAt: {
        type: Date,
        default: null
    },

    usageLimit: {
        type: Number,
        default: null
    },

    usedCount: {
        type: Number,
        default: 0
    },

    active: {
        type: Boolean,
        default: true
    }

}, {

    timestamps: true

});

module.exports = mongoose.model('Coupon', couponSchema);
