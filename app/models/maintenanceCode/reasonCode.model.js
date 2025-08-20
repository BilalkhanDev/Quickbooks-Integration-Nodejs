// fundingsource.model.js
const mongoose = require('mongoose');
const BaseModel = require('../common/base.model');  

class ReasonCodeModel extends BaseModel {
  constructor() {
    super();

  }
}

const ReasonCode = mongoose.model('ReasonCode', new ReasonCodeModel().schema);

module.exports = ReasonCode;

