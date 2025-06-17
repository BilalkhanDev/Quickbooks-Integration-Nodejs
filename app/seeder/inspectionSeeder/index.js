const mongoose = require('mongoose');
const Inspection = require('../../models/Inspection');
const { InspectionData } = require('./InspectionData');


const seedInspections = async () => {
  try {
    const count = await Inspection.countDocuments();
    if (count === 0) {
      console.log(InspectionData);
      // Insert ea
      await Inspection.insertMany(InspectionData);
      console.log('✅ Flattened inspections seeded successfully');
    } else {
      console.log('ℹ️ Inspections already exist, skipping seeding');
    }
  } catch (error) {
    console.error('❌ Error seeding inspections:', error);
  }
};

module.exports = seedInspections;
