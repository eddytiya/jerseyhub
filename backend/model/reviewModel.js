const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {

        userId: {

            type: String,

            required: true

        },

        username: {

            type: String,

            required: true,

            trim: true

        },

        jerseyId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Jersey",

            required: true

        },

        orderId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Order",

            required: true

        },

        rating: {

            type: Number,

            required: true,

            min: 1,

            max: 5

        },

        review: {

            type: String,

            required: true,

            trim: true,

            maxlength: 500

        },

        isVerifiedPurchase: {

            type: Boolean,

            default: true

        },

        isApproved: {

            type: Boolean,

            default: false

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(
    "Review",
    reviewSchema
);