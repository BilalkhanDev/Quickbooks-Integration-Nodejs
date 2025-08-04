const ServiceArea = require('../../models/common/serviceArea.model');

const defaultServiceAreas = [
  {
    title: 'Los Angeles Metro',
    description: 'Covers primary NEMT service routes across the Los Angeles metropolitan area.',
    zipCodes: ['90001', '90002', '90003', '90007', '90011'],
    isActive: true,
  },
  {
    title: 'Bay Area North',
    description: 'Includes serviceable areas in San Francisco, Oakland, and Berkeley regions.',
    zipCodes: ['94102', '94607', '94704', '94110'],
    isActive: true,
  },
  {
    title: 'San Diego County',
    description: 'Supports transport for eligible members within San Diego County limits.',
    zipCodes: ['92101', '92103', '92104', '92105', '92109'],
    isActive: false,
  },
];

const seedServiceAreas = async () => {
  try {
    const count = await ServiceArea.countDocuments();
    if (count === 0) {
      const inserted = await ServiceArea.insertMany(defaultServiceAreas);
      console.log('✅ Service areas seeded successfully');
      return inserted.map(area => area._id);
    } else {
      console.log('ℹ️ Service areas already exist, skipping seeding');
      const existing = await ServiceArea.find({}, '_id').lean();
      return existing.map(area => area._id);
    }
  } catch (error) {
    console.error('❌ Error seeding service areas:', error);
    return [];
  }
};

module.exports = seedServiceAreas;
