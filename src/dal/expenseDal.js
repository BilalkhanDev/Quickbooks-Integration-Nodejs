const Expense = require('../app/models/common/expense.model');

exports.create = (data) => Expense.create(data);

exports.findAll = () => Expense.find();

exports.findById = (id) => Expense.findById(id);

exports.updateById = (id, data) => Expense.findByIdAndUpdate(id, data, { new: true });

exports.deleteById = (id) => Expense.findByIdAndDelete(id);

exports.bulkDelete = (ids) => Expense.deleteMany({ _id: { $in: ids } });
