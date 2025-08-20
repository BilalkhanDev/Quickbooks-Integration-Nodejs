const mongoose = require('mongoose');
const { ReasonCode } = require('../../models');  // Ensure ReasonCode model is imported

const defaultReasonCodes = [
  "Breakdown",
  "Fuel",
  "Tire Replacement",
  "Oil Change",
  "Engine Service",
  "Battery Replacement",
  "Suspension Repair",
  "Brake Repair",
  "Transmission Repair",
  "Electrical System Maintenance"
];

const seedReasonCode = async () => {
  try {
    // Check if there are existing ReasonCodes
    const count = await ReasonCode.countDocuments();
    
    if (count === 0) {
      // Insert default ReasonCodes into the database
      const reasonCodes = defaultReasonCodes.map(title => ({
        title
      }));

      const insertedReasonCodes = await ReasonCode.insertMany(reasonCodes);
      console.log('✅ ReasonCodes seeded successfully');
      
      // Return inserted ReasonCode IDs
      return insertedReasonCodes.map(reasonCode => reasonCode._id);
    } else {
      console.log('ℹ️ ReasonCodes already exist, skipping seed');
    }
  } catch (error) {
    console.error('❌ Error seeding ReasonCodes:', error);
    return null;
  }
};

module.exports = seedReasonCode;
