// equipment.model.js
const mongoose = require('mongoose');
const BaseModel = require('./base.model');  // Importing the generic class

class EquipmentModel extends BaseModel {
  constructor() {
    super();  
    this.schema.add({
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
  }
}

const Equipment = mongoose.model('Equipment', new EquipmentModel().schema);

module.exports = Equipment;
