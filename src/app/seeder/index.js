require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const mongoose = require('mongoose');

const createAdminUser = require('./admin.seeder');
const seedFleetStatuses = require('./status.seeder');
const seedFleetTypes = require('./type.seeder');
const seedExpenses = require('./expense.seeder');
const seedVendors = require('./vendor.seeder');
const seedInspections = require('./inspectionSeeder/index.js');
const seedCompanies = require('./company.seeder.js');
const seedFuelTypes = require('./fuelType.seeder.js')
const seedCommon = require('./commonSeeder/index.js');
const seedFleet = require('./fleet.seeder.js');

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
