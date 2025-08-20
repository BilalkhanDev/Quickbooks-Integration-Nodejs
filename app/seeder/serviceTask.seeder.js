const mongoose = require('mongoose');
const { ServiceTask } = require('../models');


const defaultServiceTasks = [
  "ABS Control Module Replacement",
  "A/C Accumulator Replacement",
  "Accelerator Pedal Inspect",
  "A/C Condenser Replacement",
  "A/C System Test",
  "Tire Pressure Check",
  "Brake Pad Replacement",
  "Fuel Filter Change",
  "Oil Change",
  "Battery Replacement"
];

const seedServiceTask = async () => {
  try {
    // Check if there are any existing ServiceTask records
    const existingServiceTaskCount = await ServiceTask.countDocuments();

    // If ServiceTask documents already exist, skip seeding
    if (existingServiceTaskCount > 0) {
      console.log('ℹ️ ServiceTask records already exist, skipping seed.');
      return;
    }

    let serviceTasks = [];

    // Loop through default titles and create ServiceTask entries
    defaultServiceTasks.forEach((title) => {
      serviceTasks.push({
        title, // Directly assign title from the array
      });
    });

    // Insert the service tasks into the database
    const insertedServiceTasks = await ServiceTask.insertMany(serviceTasks);
    console.log('✅ Service tasks seeded successfully');

    // Return the inserted ServiceTask IDs
    return insertedServiceTasks.map((serviceTask) => serviceTask._id);

  } catch (error) {
    console.error('❌ Error seeding Service tasks:', error);
    return null;
  }
};

module.exports = seedServiceTask;
