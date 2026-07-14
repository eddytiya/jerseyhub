const mongoose = require('mongoose');

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