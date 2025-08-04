const expenseDal = require('../../dal/expenseDal');

exports.createExpense = async (data) => expenseDal.create(data);

exports.getAllExpenses = async () => expenseDal.findAll();

exports.getExpenseById = async (id) => expenseDal.findById(id);

exports.updateExpense = async (id, data) => expenseDal.updateById(id, data);

exports.removeExpense = async (id) => expenseDal.deleteById(id);

exports.bulkRemoveExpenses = async (ids) => expenseDal.bulkDelete(ids);
