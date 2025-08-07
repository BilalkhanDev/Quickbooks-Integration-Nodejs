const catchAsync = require('../../shared/core/utils/catchAsync');
const service = require('../../services/common/expense.service');

exports.create = catchAsync(async (req, res) => {
  const expense = await service.create(req.body);
  res.status(201).json(expense);

});

exports.getAll = catchAsync(async (_req, res) => {

  const expenses = await service.getAll();
  res.status(200).json(expenses);

});

exports.getById = catchAsync(async (req, res) => {

  const expense = await service.getById(req.params.id);
  if (!expense) return res.status(404).json({ error: 'Expense not found' });
  res.json(expense);

});

exports.update = catchAsync(async (req, res) => {

  const updated = await service.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Expense not found' });
  res.json(updated);

});

exports.remove = catchAsync(async (req, res) => {

  const removed = await service.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Expense not found' });
  res.json({ message: 'Expense deleted' });

});

exports.bulkRemove = catchAsync(async (req, res) => {

  const result = await service.bulkRemove(req.body);
  res.json({ message: `${result.deletedCount} expenses deleted` });

});

