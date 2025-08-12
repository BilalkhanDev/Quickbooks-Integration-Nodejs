const mongoose = require('mongoose');
const GenericModel = require('./generic.model');
const equipmentSchema = new GenericModel().schema; 

equipmentSchema.add({
  code: {
    type: String,
    trim: true,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
