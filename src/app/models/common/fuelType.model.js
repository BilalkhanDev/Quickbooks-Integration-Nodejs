const mongoose = require('mongoose');
const { search, paginate } = require('../../../shared/plugin');


const FuelTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  usage: { type: Number, default: 0 },
  fuelUsage: { type: Number, default: 0 },
}, { timestamps: true });

FuelTypeSchema.plugin(search);
FuelTypeSchema.plugin(paginate);

module.exports = mongoose.model('FuelType', FuelTypeSchema);
