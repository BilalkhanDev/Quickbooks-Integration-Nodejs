// spacetype.model.js
const mongoose = require('mongoose');
const BaseModel = require('./base.model');  // Importing the generic class

class SpaceTypeModel extends BaseModel {
  constructor() {
    super();
    this.schema.add({
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
  }
}

const SpaceType = mongoose.model('SpaceType', new SpaceTypeModel().schema);

module.exports = SpaceType;
