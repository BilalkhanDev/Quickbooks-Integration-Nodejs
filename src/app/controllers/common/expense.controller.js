const service = require('../../services/expenseService');

const create = async (req, res) => {
  try {
    const expense = await service.createExpense(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const expenses = await service.getAllExpenses();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const expense = await service.getExpenseById(req.params.id);
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updated = await service.updateExpense(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Expense not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const removed = await service.removeExpense(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const bulkRemove = async (req, res) => {
  try {
    const result = await service.bulkRemoveExpenses(req.body);
    res.json({ message: `${result.deletedCount} expenses deleted` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports={
    create,
    update,
    remove,
    getAll,
    getById,
    bulkRemove
}