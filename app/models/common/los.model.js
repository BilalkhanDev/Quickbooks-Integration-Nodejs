// los.model.js
const mongoose = require('mongoose');
const BaseModel = require('./base.model');  // Importing the generic class

class LOSModel extends BaseModel {
  constructor() {
    super();
    this.schema.add({
      profileImageURL: {
        type: String,
        required: false,
        default: '',
      },
    });
  }
}

const LOS = mongoose.model('LOS', new LOSModel().schema);

module.exports = LOS;
