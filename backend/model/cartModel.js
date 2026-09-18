const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    jerseyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jersey',
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    },

    selectedSize: { type: String, default: "" },

    sku: { type: String, default: "" },

    buyNow: {
        type: Boolean,
        default: false
    },

    reminderSent: {
        type: Boolean,
        default: false
    }

}, {

    timestamps: true

})

module.exports = mongoose.model(
    'Cart',
    cartSchema
)
