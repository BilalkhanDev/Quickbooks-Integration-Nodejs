const mongoose = require('mongoose');

const WeightSchema = new mongoose.Schema({
    curbWeight: { type: Number, default: 0 },
    grossRating: { type: Number, default: 0 },

}, {
    timestamps: true
});

module.exports = mongoose.model('Weight', WeightSchema);
