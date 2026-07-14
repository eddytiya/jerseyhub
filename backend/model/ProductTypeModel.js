const mongoose = require("mongoose");

const productTypeSchema = mongoose.Schema(

    {

        typeName: {

            type: String,

            required: true,

            unique: true,

            trim: true

        },

        description: {

            type: String,

            default: ""

        },

        status: {

            type: Boolean,

            default: true

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "ProductType",

    productTypeSchema

);