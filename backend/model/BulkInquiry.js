const mongoose = require('mongoose');

const bulkInquirySchema = new mongoose.Schema({

    name: {
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

    teamName: {
        type: String,
        default: ""
    },

    quantity: {
        type: Number,
        required: true
    },

    jerseyDetails: {
        type: String,
        default: ""
    },

    message: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["New", "Contacted", "Closed"],
        default: "New"
    }

}, {

    timestamps: true

});

module.exports = mongoose.model('BulkInquiry', bulkInquirySchema);
