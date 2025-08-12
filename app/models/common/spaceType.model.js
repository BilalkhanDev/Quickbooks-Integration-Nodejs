const mongoose = require('mongoose');
const GenericModel = require('./generic.model');

const spaceTypeSchema = new GenericModel().schema;

spaceTypeSchema.add({
  los: { type: mongoose.Schema.ObjectId, ref: 'LOS' },
  loadTime: {
    type: String,
    required: true,
  },
  unloadTime: {
    type: String,
    required: true,
  },
});

const SpaceType = mongoose.model('SpaceType', spaceTypeSchema);

module.exports = SpaceType;
