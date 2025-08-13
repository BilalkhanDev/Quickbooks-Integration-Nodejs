// services/expenseService.js

const mongoose = require('mongoose');
const { Expense } = require('../../models');
const GenericService = require('../generic.service');

class ExpenseService extends GenericService  {
constructor(){
  super(Expense)
}
  async bulkRemove(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    return this.model.deleteMany({ _id: { $in: validIds } });
  }
}

module.exports = new ExpenseService();
