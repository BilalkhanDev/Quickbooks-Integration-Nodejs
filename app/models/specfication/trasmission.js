const mongoose = require('mongoose');

const TransmissionSchema = new mongoose.Schema({
    transmissionSummary: { type: String, default: "" },
    transmissionBrand: { type: String, default: "" },     
    transmissionType: {
        type: Number,
        enum: {
            values: [0, 1],
            message: 'Transmission Type must be 0, 1'
        },
        default: null
    },
    transmissionGears: { type: Number, default: 0 }
}, {
    timestamps: false
});

module.exports = mongoose.model('Transmission', TransmissionSchema);
