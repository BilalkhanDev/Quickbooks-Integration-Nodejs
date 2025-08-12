// services/expenseService.js

const mongoose = require('mongoose');
const { Expense } = require('../../models');

class ExpenseService {
  async create(data) {
    return Expense.create(data);
  }

  async getAll() {
    return Expense.find();
  }

  async getById(id) {
    return Expense.findById(id);
  }

  async update(id, data) {
    return Expense.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return Expense.findByIdAndDelete(id);
  }

  async bulkRemove(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    return Expense.deleteMany({ _id: { $in: validIds } });
  }
}

module.exports = new ExpenseService();
