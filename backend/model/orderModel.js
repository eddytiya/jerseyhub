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

                "Failed"

            ],

            default: "Pending"

        },

        paymentMethod: {

            type: String,

            default: "Cash On Delivery"

        },

        trackingNumber: {

            type: String,

            default: ""

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

module.exports = mongoose.model(

    "Order",

    orderSchema

);