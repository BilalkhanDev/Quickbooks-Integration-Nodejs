const LOS = require('../../models/common/los.model');

const defaultLOS = [
  {
    title: 'Basic',
    description: 'Basic level of transportation service for ambulatory members.',
    profileImageURL: '',
    isActive: true,
  },
  {
    title: 'Advanced',
    description: 'Includes assistance and special equipment like wheelchairs.',
    profileImageURL: '',
    isActive: true,
  },
  {
    title: 'Critical',
    description: 'Critical care transport for patients with medical needs.',
    profileImageURL: '',
    isActive: true,
  },
];

const seedLOS = async () => {
  try {
    const existing = await LOS.find({});
    if (existing.length === 0) {
      await LOS.insertMany(defaultLOS);
      console.log('✅ LOS seeded');
    } else {
      console.log('ℹ️ LOS already exists, skipping insertion.');
    }
    const ids = await LOS.find({}).select('_id');
    return ids?.map(doc => doc?._id);
  } catch (error) {
    console.error('❌ Error seeding LOS:', error);
    return [];
  }
};

module.exports = seedLOS;
