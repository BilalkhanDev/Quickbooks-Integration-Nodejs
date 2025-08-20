const mongoose = require('mongoose');
const { CategoryCode, SystemCode } = require('../../models');  // Ensure CategoryCode and SystemCode models are imported

const defaultSystemCodes = [
  "Axles - Driven, Front Steering",
  "Axles - Driven, Rear Steering",
  "Brakes - Hydraulic",
  "Brakes - Pneumatic",
  "Drive Train - Manual Transmission",
  "Drive Train - Automatic Transmission",
  "Drive Train - CVT",
  "Electrical - Lighting",
  "Electrical - Battery System",
  "Electrical - Wiring Harness",
];

const seedSystemCode = async () => {
  try {
    // Check if there are existing SystemCode documents
    const existingSystemCodeCount = await SystemCode.countDocuments();
    
    // If documents already exist, skip seeding
    if (existingSystemCodeCount > 0) {
      console.log('ℹ️ System codes already exist, skipping seed.');
      return;
    }

    let systemCodes = [];
    const categoryCodes = await CategoryCode.find({}).limit(5); // Get the first 5 categories

    if (categoryCodes.length === 0) {
      console.log('❌ No CategoryCodes found!');
      return;
    }

    let systemCodeIndex = 0;

    // Loop through categories and create system codes
    for (const category of categoryCodes) {
      for (let i = 0; i < 2; i++) { // Create two system codes per category
        const systemCodeTitle = defaultSystemCodes[systemCodeIndex % defaultSystemCodes.length]; // Get system code title
        systemCodes.push({
          title: systemCodeTitle,
          categoryCode: category._id, // Associate the system code with the current category code
        });

        systemCodeIndex++;
      }
    }

    // Insert system codes into the database
    await SystemCode.insertMany(systemCodes);
    console.log('✅ System codes seeded successfully');

  } catch (error) {
    console.error('❌ Error seeding System codes:', error);
    return null;
  }
};

module.exports = seedSystemCode;
