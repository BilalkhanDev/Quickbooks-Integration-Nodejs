const mongoose = require('mongoose');

const WheelSchema = new mongoose.Schema({
    driveType: {
        type: Number,
        enum: {
            values: [0, 1, 2],
            message: 'Driver Type must be 0, 1, or 2'
        },
        default: null
    },
    brakeSystem: {
        type: Number,
        enum: {
            values: [0, 1],
            message: 'Brake System must be 0, 1'
        },
        default: null
    },

    frontTrackWidth: { type: Number, default: 0 },
    rearTrackWidth: { type: Number, default: 0 },
    wheelbase: { type: Number, default: 0 },

    frontWheelDiameter: { type: String, default: null },
    rearWheelDiameter: { type: String, default: null },

    rearAxle: { type: String, default: "" },

    frontTireType: { type: String, default: "" },
    frontTirePSI: { type: Number, default: 0 },

    rearTireType: { type: String, default: "" },
    rearTirePSI: { type: Number, default: 0 }
}, {
    timestamps: false
});

module.exports = mongoose.model('Wheel', WheelSchema);
