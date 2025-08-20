const mongoose = require('mongoose');
const { SystemCode, AssemblyCode } = require('../../models');  // Ensure SystemCode and AssemblyCode models are imported

const defaultAssemblyCodes = [
  "Clutch Output Shaft - Divorced Transmission",
  "Clutch Input Shaft - Manual Transmission",
  "Pneumatic Braking System Valve",
  "Electrical Battery Connector",
  "Hydraulic Fluid Pump - Main Drive",
  "Drive Shaft - Front Wheel",
  "Drive Shaft - Rear Wheel",
  "Wiring Harness - Engine",
  "Wiring Harness - Battery",
  "Lighting System - Headlights",
];

const seedAssemblyCode = async () => {
  try {
    // Check if there are any existing AssemblyCode records
    const existingAssemblyCodeCount = await AssemblyCode.countDocuments();

    // If AssemblyCode documents already exist, skip seeding
    if (existingAssemblyCodeCount > 0) {
      console.log('ℹ️ Assembly codes already exist, skipping seed.');
      return;
    }

    let assemblyCodes = [];
    const systemCodes = await SystemCode.find({}).limit(5); // Get the first 5 SystemCodes for the sake of example

    if (systemCodes.length === 0) {
      console.log('❌ No SystemCodes found!');
      return;
    }

    let assemblyCodeIndex = 0;

    // Loop through each SystemCode and create 2 AssemblyCode entries
    for (const systemCode of systemCodes) {
      for (let i = 0; i < 2; i++) {
        const assemblyCodeTitle = defaultAssemblyCodes[assemblyCodeIndex % defaultAssemblyCodes.length]; // Get title from defaultAssemblyCodes
        assemblyCodes.push({
          title: assemblyCodeTitle,
          systemCode: systemCode._id, // Link to the current SystemCode
        });

        // Update index to get the next title from defaultAssemblyCodes
        assemblyCodeIndex++;
      }
    }

    // Insert assembly codes into the database
    const insertedAssemblyCodes = await AssemblyCode.insertMany(assemblyCodes);
    console.log('✅ Assembly codes seeded successfully');

    // Return all inserted AssemblyCode IDs
    return insertedAssemblyCodes.map(assemblyCode => assemblyCode._id);

  } catch (error) {
    console.error('❌ Error seeding Assembly codes:', error);
    return null;
  }
};

module.exports = seedAssemblyCode;
