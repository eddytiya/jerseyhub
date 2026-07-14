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

    buyNow: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model(
    'Cart',
    cartSchema
)