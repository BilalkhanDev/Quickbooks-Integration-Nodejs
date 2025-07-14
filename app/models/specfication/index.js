const mongoose = require('mongoose');

const FleetSpecSchema = new mongoose.Schema({
  fleetId: {
    type: String,
    required: true,
    unique: true,
  },
  engine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engine'
  },
  wheel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wheel'
  },
  transmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transmission'
  },
  weight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weight'
  },
  fuel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fuel'
  },
  performance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Performance'
  }
}, {
  timestamps: true
});


FleetSpecSchema.virtual('engineDetails', {
  ref: 'Engine',
  localField: 'engine',
  foreignField: '_id',
  justOne: true // Whether to return just one or an array
});

FleetSpecSchema.virtual('wheelDetails', {
  ref: 'Wheel',
  localField: 'wheel',
  foreignField: '_id',
  justOne: true
});

FleetSpecSchema.virtual('transmissionDetails', {
  ref: 'Transmission',
  localField: 'transmission',
  foreignField: '_id',
  justOne: true
});

FleetSpecSchema.virtual('weightDetails', {
  ref: 'Weight',
  localField: 'weight',
  foreignField: '_id',
  justOne: true
});

FleetSpecSchema.virtual('fuelDetails', {
  ref: 'Fuel',
  localField: 'fuel',
  foreignField: '_id',
  justOne: true
});

FleetSpecSchema.virtual('performanceDetails', {
  ref: 'Performance',
  localField: 'performance',
  foreignField: '_id',
  justOne: true
});

// Enable virtuals to be included in JSON output
FleetSpecSchema.set('toObject', { virtuals: true });
FleetSpecSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('FleetSpec', FleetSpecSchema);
