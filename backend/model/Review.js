const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(

    {

        /* ==========================================
                    PRODUCT
        ========================================== */

        jersey: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Jersey",

            required: true

        },

        /* ==========================================
                    USER
        ========================================== */

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "user",

            required: true

        },

        /* ==========================================
                    RATING
        ========================================== */

        rating: {

            type: Number,

            required: true,

            min: 1,

            max: 5

        },

        /* ==========================================
                    REVIEW
        ========================================== */

        comment: {

            type: String,

            required: true,

            trim: true,

            maxlength: 1500

        },

        /* ==========================================
                    REVIEW IMAGES
        ========================================== */

        images: [

            {

                type: String,

                trim: true

            }

        ],

        /* ==========================================
                VERIFIED PURCHASE
        ========================================== */

        verifiedPurchase: {

            type: Boolean,

            default: false

        },

        /* ==========================================
                    HELPFUL
        ========================================== */

        helpful: {

            type: Number,

            default: 0

        },

        

        /* ==========================================
                    STATUS
        ========================================== */

       status: {

    type: String,

    enum: [

        "published",

        "hidden"

    ],

    default: "published"

}

    },

    {

        timestamps: true

    }

);

/* ==========================================
        ONE REVIEW PER USER PER PRODUCT
========================================== */

reviewSchema.index(

    {

        jersey: 1,

        user: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(

    "Review",

    reviewSchema

);