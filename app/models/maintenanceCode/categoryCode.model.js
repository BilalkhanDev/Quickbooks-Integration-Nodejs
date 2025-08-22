// fundingsource.model.js
const mongoose = require('mongoose');
const BaseModel = require('../common/base.model');  

class CategoryCodeModel extends BaseModel {
  constructor() {
    super();    
  }
}

const CategoryCode = mongoose.model('CategoryCode', new CategoryCodeModel().schema);

module.exports = CategoryCode;
