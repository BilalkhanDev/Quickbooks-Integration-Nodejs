// fundingsource.model.js
const mongoose = require('mongoose');
const BaseModel = require('../common/base.model');  

class CategoryCodeModel extends BaseModel {
  constructor() {
    super();    
  }
}

const CategoryCode = mongoose.model('Category', new CategoryCodeModel().schema);

module.exports = CategoryCode;
