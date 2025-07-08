const mongoose = require('mongoose');

const EngineSchema = new mongoose.Schema({
    engineSummary: { type: String, default: "" },
    engineBrand: { type: String, default: "" },

    aspiration: {
        type: Number,
        enum: {
            values: [0, 1],
            message: 'Aspiration must be 0 or 1'
        },
        default: null
    },

    blockType: {
        type: Number,
        enum: {
            values: [0, 1],
            message: 'Block Type must be 0 or 1'
        },
        default: null
    },

    bore: { type: Number, default: 0 },

    camType: {
        type: Number,
        enum: {
            values: [0, 1],
            message: 'Cam Type must be 0 or 1'
        },
        default: null
    },

    compression: { type: Number, default: 0 },
    cylinders: { type: Number, default: 0 },
    displacement: { type: Number, default: 0 },

    fuelInduction: {
        type: Number,
        enum: {
            values: [0, 1, 2, 3],
            message: 'Fuel Induction must be 0, 1, 2, or 3'
        },
        default: null
    },

    maxHP: { type: Number, default: 0 },
    maxTorque: { type: Number, default: 0 },
    redlineRPM: { type: Number, default: 0 },
    stroke: { type: Number, default: 0 },
    valves: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Engine', EngineSchema);
