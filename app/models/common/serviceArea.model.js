// servicearea.model.js
const mongoose = require('mongoose');
const BaseModel = require('./base.model');  // Importing the generic class

class ServiceAreaModel extends BaseModel {
  constructor() {
    super();
    this.schema.add({
      zipCodes: [
        {
          type: [String],
        },
      ],
    });
  }
}

const ServiceArea = mongoose.model('ServiceArea', new ServiceAreaModel().schema);

module.exports = ServiceArea;
