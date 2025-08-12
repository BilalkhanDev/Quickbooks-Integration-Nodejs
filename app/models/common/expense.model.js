const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
    
  },
  usage: {
    type: Number,
    default: 0
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);
