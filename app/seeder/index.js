require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const mongoose = require('mongoose');

const createAdminUser = require('./admin.seeder');
const seedRoles = require('./roles.seeder.js');
const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    const roles=await seedRoles()
    await createAdminUser(roles);
    console.log("✅ All seeders executed successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

runSeeders();
