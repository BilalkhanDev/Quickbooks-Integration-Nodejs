const mongoose = require('mongoose');
const Expense = require('../models/expense');

const defaultExpenses = [
  { name: 'Annual Inspection Fees' },
  { name: 'Depreciation' },
  { name: 'Down Payment' },
  { name: 'Equipment' },
  { name: 'Fines' },
  { name: 'Insurance' },
  { name: 'Lease' },
  { name: 'Legal/Court Costs' },
  { name: 'Loan' },
  { name: 'Loan Payment' },
  { name: 'Miscellaneous' },
  { name: 'Moving Violations' },
  { name: 'Safety Technology' },
  { name: 'Telematics Device' },
  { name: 'Tolls' },
  { name: 'Tool' },
  { name: 'Vehicle Disposal Costs' },
  { name: 'Vehicle Registration and Taxes' },
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
