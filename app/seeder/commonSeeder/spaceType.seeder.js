const SpaceType = require('../../models/common/spaceType.model');

const seedSpaceTypes = async (losIds = []) => {
  try {
    const count = await SpaceType.countDocuments();
    if (count === 0) {
      if (!losIds.length) {
        throw new Error('LOS IDs are required to seed SpaceTypes.');
      }

      const defaultSpaceTypes = [
        {
          title: 'Ambulatory',
          description: 'For passengers who can walk without assistance.',
          loadTime: '5',
          unloadTime: '5',
          wnr: false,
          los: losIds[0], 
          isActive: true,
        },
        {
          title: 'Wheelchair',
          description: 'For passengers using a wheelchair, requires ramp or lift.',
          loadTime: '10',
          unloadTime: '10',
          wnr: true,
          los: losIds[1] || losIds[0],
          isActive: true,
        }
      ];

      const inserted = await SpaceType.insertMany(defaultSpaceTypes);
      console.log('✅ Space types seeded successfully');
      return inserted.map(item => item._id); // Return the new SpaceType IDs
    } else {
      console.log('ℹ️ Space types already exist. Skipping seed.');
      const all = await SpaceType.find({}).select('_id');
      return all.map(item => item._id);
    }
  } catch (error) {
    console.error('❌ Error seeding space types:', error);
    return [];
  }
};

module.exports = seedSpaceTypes;
