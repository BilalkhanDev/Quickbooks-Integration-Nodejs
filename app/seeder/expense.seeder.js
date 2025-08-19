const mongoose = require('mongoose');
const Expense = require('../models/common/expense.model');

const defaultExpenses = [
  { title: 'Annual Inspection Fees' },
  { title: 'Depreciation' },
  { title: 'Down Payment' },
  { title: 'Equipment' },
  { title: 'Fines' },
  { title: 'Insurance' },
  { title: 'Lease' },
  { title: 'Legal/Court Costs' },
  { title: 'Loan' },
  { title: 'Loan Payment' },
  { title: 'Miscellaneous' },
  { title: 'Moving Violations' },
  { title: 'Safety Technology' },
  { title: 'Telematics Device' },
  { title: 'Tolls' },
  { title: 'Tool' },
  { title: 'Vehicle Disposal Costs' },
  { title: 'Vehicle Registration and Taxes' },
];

const seedExpenses = async () => {
  try {
    const count = await Expense.countDocuments();
    if (count === 0) {
      await Expense.insertMany(defaultExpenses);
      console.log('✅ Expenses seeded successfully');
    } else {
      console.log('ℹ️ Expenses already exist, skipping seed');
    }
  } catch (error) {
    console.error('❌ Error seeding expenses:', error);
  }
};

module.exports = seedExpenses;
