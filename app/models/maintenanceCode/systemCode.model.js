// fundingsource.model.js
const mongoose = require('mongoose');
const BaseModel = require('../common/base.model');  

class SystemCodeModel extends BaseModel {
  constructor() {
    super();
    this.schema.add({
       categoryCode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CategoryCode',
            required:true
        }
    })
  }
}

const SystemCode = mongoose.model('SystemCode', new SystemCodeModel().schema);

module.exports = SystemCode;

