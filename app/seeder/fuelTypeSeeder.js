const FuelType = require('../models/fuelTypes');

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
    const count = await FuelType.countDocuments();
    if (count === 0) {
      await FuelType.insertMany(defaultFuelTypes);
      console.log('✅ Fuel types seeded');
    }
  } catch (error) {
    console.error('❌ Error seeding fuel types:', error);
  }
};

module.exports = seedFuelTypes;