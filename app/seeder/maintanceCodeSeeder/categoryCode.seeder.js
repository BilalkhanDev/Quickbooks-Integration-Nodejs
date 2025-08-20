const mongoose = require('mongoose');
const { CategoryCode } = require('../../models');

const defaultCategories = [
  { title: 'Cab, Climate Control, Instrumentation, \u0026 Aerodynamic Devices'},
  { title: 'Chassis'},
  { title: 'Drive Train' },
  { title: 'Electrical' },
  { title: 'Accessories' },
  { title: 'Bodies \u0026 Vessels' },
  { title: 'Heating \u0026 Refrigeration' },
];

const seedCategoryCode = async () => {
  try {
    let categoryCodes = [];
    const count = await CategoryCode.countDocuments();

    if (count === 0) {
      categoryCodes = await CategoryCode.insertMany(defaultCategories);
      console.log('✅ Categories code seeded successfully');
    } else {
      categoryCodes = await CategoryCode.find({}).sort({ createdAt: 1 }); // Fetch all entries
      console.log('ℹ️ Categories code already exist, skipping seed');
    }

    // Return an array of all category _id values
    // return categoryCodes.map((category) => category._id);

  } catch (error) {
    console.error('❌ Error seeding Categories code:', error);
    return null;
  }
};

module.exports = seedCategoryCode;
