const seedEquipments = require('./equipmet.seeder');
const seedFundingSources = require('./fundingSource.seeder');
const seedLOS = require('./los.seeder');
const seedServiceAreas = require('./serviceArea.seeder');
const seedSpaceTypes = require('./spaceType.seeder');


const seedCommon = async () => {
  try {
  
    const losIds = await seedLOS();                  
    const spaceTypeIds = await seedSpaceTypes(losIds);
    const fundingSourceIds = await seedFundingSources();
    const serviceAreaIds = await seedServiceAreas();
    const equipmentIds = await seedEquipments();
    return {
      losId: losIds[0],
      spaceTypeId: spaceTypeIds[0],
      fundingSourceId: fundingSourceIds[0],
      serviceAreaId: serviceAreaIds[0],
      equipmentId: equipmentIds[0],
    };
  } catch (error) {
    console.error('❌ Error running common seeders:', error);
    return {};
  }
};

module.exports = seedCommon;
