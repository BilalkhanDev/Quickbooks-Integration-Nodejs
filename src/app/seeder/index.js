require('dotenv').config();
const mongoose = require('mongoose');

const createAdminUser = require('./adminSeeder');
const seedFleetStatuses = require('./statusSeeder');
const seedFleetTypes = require('./typeSeeder');
const seedExpenses = require('./expenseSeeder');
const seedVendors = require('./vendorSeeder');
const seedInspections = require('./inspectionSeeder');
const seedCompanies = require('./companySeeder');
const seedFuelTypes = require('./fuelTypeSeeder')
const seedCommon = require('./commonSeeder');
const seedFleet = require('./fleetSeeder');

const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    const userIds=await createAdminUser();
    await seedFleetStatuses();

    await seedExpenses();

    await seedVendors()
    await seedInspections()
    const { losId, spaceTypeId, fundingSourceId, serviceAreaId, equipmentId } = await seedCommon()
    const companyId = await seedCompanies()
    const fuelTypeId = await seedFuelTypes()
    const fleetTypeId = await seedFleetTypes();
    await seedFleet({userIds,losId, spaceTypeId, fundingSourceId, serviceAreaId, equipmentId, companyId, fuelTypeId, fleetTypeId})



    console.log("✅ All seeders executed successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

runSeeders();
