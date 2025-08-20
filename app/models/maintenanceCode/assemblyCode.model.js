// fundingsource.model.js
const mongoose = require('mongoose');
const BaseModel = require('../common/base.model');  

class AssemblyCodeModel extends BaseModel {
  constructor() {
    super();
    this.schema.add({
       systemCode: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SystemCode',
            required:true
        }
    })

  }
}

const AssemblyCode = mongoose.model('AssemblyCode', new AssemblyCodeModel().schema);

module.exports = AssemblyCode;

