// expense.model.js
const mongoose = require('mongoose');
const BaseModel = require('./base.model');  // Importing the generic class

class ExpenseModel extends BaseModel {
  constructor() {
    super();  
    this.schema.add({
      name: {
        type: String,
        required: true,
        unique: true,
      },
      usage: {
        type: Number,
        default: 0
      },
    });
  }
}

const Expense = mongoose.model('Expense', new ExpenseModel().schema);

module.exports = Expense;
