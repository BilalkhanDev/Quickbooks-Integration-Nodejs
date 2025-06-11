// models/Vehicle.js
const mongoose = require('mongoose');
const { FLEET_STATUS } = require('../constants/role');

const FleetSchema = new mongoose.Schema({
    plate_number: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    year: { type: Number, required: true },
    odometer: { type: Number, required: true },
    assigned_driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: FLEET_STATUS,
        default: FLEET_STATUS.ACTIVE,
    },
    insurance_expiry: Date,
    service_due_date: Date,
}, {
    timestamps: true
});

module.exports = mongoose.model('Fleet', FleetSchema);
