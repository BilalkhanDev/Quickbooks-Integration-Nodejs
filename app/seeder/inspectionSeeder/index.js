const mongoose = require('mongoose');
const Inspection = require('../../models/inspection/inspection.model');
const { InspectionData } = require('./InspectionData');


const seedInspections = async () => {
  try {
    const count = await Inspection.countDocuments();
    if (count === 0) {
    
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
