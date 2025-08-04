const mongoose = require('mongoose');
const Company = require('../models/company');

const defaultCompanies = [
  { name: 'Boldage' },
  { name: 'Boldage Chicago' },
  { name: 'Boldage Fresno' },
  { name: 'CalOptima Orange' },
  { name: 'Central Valley' },
  { name: 'Habitat Health' },
  { name: 'Habitat Health Sacramento' },
];

const seedCompanies = async () => {
  try {
    let companies = [];
    const count = await Company.countDocuments();

    if (count === 0) {
      companies = await Company.insertMany(defaultCompanies);
      console.log('✅ Companies seeded successfully');
    } else {
      companies = await Company.find({}).sort({ createdAt: 1 }).limit(1); // Get first created
      console.log('ℹ️ Companies already exist, skipping seed');
    }

    // Return first company ID
    return companies[0]?._id || null;

  } catch (error) {
    console.error('❌ Error seeding Companies:', error);
    return null;
  }
};

module.exports = seedCompanies;
