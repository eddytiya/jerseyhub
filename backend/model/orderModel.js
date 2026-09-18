const mongoose = require("mongoose");

/* ==========================================
            ORDER ITEMS
========================================== */

const orderItemSchema = mongoose.Schema({

    jerseyId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Jersey",

        required: true

    },

    teamName: {

        type: String,

        required: true

    },

    jerseyName: {

        type: String,

        required: true

    },

    category: {

        type: String,

        required: true

    },

    imageUrl: {

        type: String,

        required: true

    },

    price: {

        type: Number,

        required: true

    },

    quantity: {

        type: Number,

        required: true

    },

    size: { type: String, default: "" },

    sku: { type: String, default: "" },

    subtotal: {

        type: Number,

        required: true

    }

});

/* ==========================================
        DELIVERY INFORMATION
========================================== */

const deliveryInfoSchema = mongoose.Schema({

    fullName: {

        type: String,

        required: true

    },

    email: {

        type: String,

        required: true

    },

    phone: {

        type: String,

        required: true

    },

    address1: {

        type: String,

        required: true

    },

    address2: {

        type: String,

        default: ""

    },

    city: {

        type: String,

        required: true

    },

    state: {

        type: String,

        required: true

    },

    pincode: {

        type: String,

        required: true

    },

    landmark: {

        type: String,

        default: ""

    }

}, {

    _id: false

});

/* ==========================================
                ORDER
========================================== */

const orderSchema = mongoose.Schema(

    {

        userId: {

            type: String,

            required: true

        },

        items: [orderItemSchema],

        subtotal: {

            type: Number,

            required: true

        },

        couponCode: {

            type: String,

            default: ""

        },

        pointsEarned: {

            type: Number,

            default: 0

        },

        pointsRedeemed: {

            type: Number,

            default: 0

        },

        discountAmount: {

            type: Number,

            default: 0

        },

        merchandiseTotal: { type: Number, default: 0 },

        shippingAmount: { type: Number, default: 0 },

        taxAmount: { type: Number, default: 0 },

        taxRate: { type: Number, default: 0 },

        totalAmount: {

            type: Number,

            required: true

        },

        deliveryInfo: {

            type: deliveryInfoSchema,

            required: true

        },

        status: {

            type: String,

            enum: [

                "Pending",

                "Processing",

                "Shipped",

                "Delivered",

                "Cancelled"

            ],

            default: "Pending"

        },

        paymentStatus: {

            type: String,

            enum: [

                "Pending",

                "Paid",

                "Failed",

                "Refunded",

                "RefundPending"

            ],

            default: "Pending"

        },

        paymentMethod: {

            type: String,

            default: "Cash On Delivery"

        },

        razorpayOrderId: {

            type: String,

            default: ""

        },

        razorpayPaymentId: {

            type: String,

            default: ""

        },

        idempotencyKey: { type: String, default: "" },

        trackingNumber: {

            type: String,

            default: ""

        },

        returnStatus: {

            type: String,

            enum: [

                "None",

                "Requested",

                "Approved",

                "Rejected",

                "Refunded"

            ],

            default: "None"

        },

        returnReason: {

            type: String,

            default: ""

        },

        returnRequestedAt: {

            type: Date,

            default: null

        },

        estimatedDelivery: {

    type: Date,

    default: null

},

shippedAt: {

    type: Date,

    default: null

},

deliveredAt: {

    type: Date,

    default: null

},

        orderDate: {

            type: Date,

            default: Date.now

        }

    },

    {

        timestamps: true

    }

);

orderSchema.index(
    { razorpayPaymentId: 1 },
    {
        unique: true,
        partialFilterExpression: { razorpayPaymentId: { $type: "string", $gt: "" } }
    }
);

orderSchema.index(
    { userId: 1, idempotencyKey: 1 },
    { unique: true, partialFilterExpression: { idempotencyKey: { $type: "string", $gt: "" } } }
);

module.exports = mongoose.model("Order", orderSchema);
