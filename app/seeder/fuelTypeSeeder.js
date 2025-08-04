const FuelType = require('../models/fuelType');

const defaultFuelTypes = [
  { name: 'BioDiesel' },
  { name: 'Compressed Natural Gas (CNG)' },
  { name: 'DEF (Diesel Exhaust Fluid)' },
  { name: 'Diesel' },
  { name: 'Diesel/Electric Hybrid' },
  { name: 'Electric' },
  { name: 'Flex Fuel' },
  { name: 'Gas/Electric Hybrid' },
  { name: 'Gasoline' },
  { name: 'Plug-in Hybrid' },
  { name: 'Propane' },
];

const seedFuelTypes = async () => {
  try {
    let fuelTypes = [];
    const count = await FuelType.countDocuments();

    if (count === 0) {
      fuelTypes = await FuelType.insertMany(defaultFuelTypes);
      console.log('✅ Fuel types seeded');
    } else {
      fuelTypes = await FuelType.find({}).sort({ createdAt: 1 }).limit(1); // get first existing
      console.log('ℹ️ Fuel types already exist, skipping seed');
    }

    return fuelTypes[0]?._id || null;

  } catch (error) {
    console.error('❌ Error seeding fuel types:', error);
    return null;
  }
};

module.exports = seedFuelTypes;
