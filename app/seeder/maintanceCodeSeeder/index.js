const seedAssemblyCode = require("./assemblyCode.seeder");
const seedCategoryCode = require("./categoryCode.seeder");
const seedReasonCode = require("./reasonCode.seeder");
const seedSystemCode = require("./systemCode.seeder");



const seedMaintanceCode = async () => {
  try {
  await seedCategoryCode()
  await seedSystemCode()
  await seedAssemblyCode()
  await seedReasonCode()

  } catch (error) {
    console.error('❌ Error running MaintanceCode seeders:', error);
    return {};
  }
};

module.exports = seedMaintanceCode;
