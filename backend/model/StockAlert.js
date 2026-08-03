const mongoose = require('mongoose');

const stockAlertSchema = new mongoose.Schema({

    jerseyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jersey',
        required: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    userId: {
        type: String,
        default: ""
    },

    notified: {
        type: Boolean,
        default: false
    }

}, {

    timestamps: true

});

stockAlertSchema.index({ jerseyId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('StockAlert', stockAlertSchema);
