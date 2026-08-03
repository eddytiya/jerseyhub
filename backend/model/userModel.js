const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({

    label: {
        type: String,
        default: "Home"
    },

    fullName: {
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

});

const userSchema = mongoose.Schema(
    {
        uname: {
            type: String,
            unique: true,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            default: null
        },

googleId: {
    type: String,
    unique: true,
    sparse: true,
    default: undefined
},
        picture: {
            type: String,
            default: ""
        },

        role: {
            type: String,
            enum: ['admin', 'customer'],
            default: 'customer'
        },

        addresses: {
            type: [addressSchema],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.models.user ||
    mongoose.model(
        'user',
        userSchema
    );