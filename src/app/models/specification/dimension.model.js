const mongoose = require('mongoose');

const DimensionSchema = new mongoose.Schema({
  width: {
    type: Number,
    required: true,
    default: 0
  },
  height: {
    type: Number,
    required: true,
    default: 0
  },
  length: {
    type: Number,
    required: true,
    default: 0
  },
  interior_vol: {
    type: Number,
    required: true,
    default: 0
  },
  passenger_vol: {
    type: Number,
    required: true,
    default: 0
  },
  cargo_vol: {
    type: Number,
    required: true,
    default: 0
  },
  ground_clearance: {
    type: Number,
    required: true,
    default: 0
  },
  bed_length: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dimension', DimensionSchema);
