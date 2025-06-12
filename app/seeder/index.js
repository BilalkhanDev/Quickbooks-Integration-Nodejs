require('dotenv').config();
const mongoose = require('mongoose');

const createAdminUser = require('./adminSeeder');
const seedFleetStatuses = require('./statusSeeder');
const seedFleetTypes = require('./typeSeeder');
const seedExpenses = require('./expenseSeeder');
const seedFuelTypes = require('./fuelTypeSeeder');
const seedVendors = require('./vendorSeeder');

const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    await createAdminUser();
    await seedFleetStatuses();
    await seedFleetTypes();
    await seedExpenses();
    await seedFuelTypes()
    await seedVendors()

    console.log("✅ All seeders executed successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

runSeeders();
