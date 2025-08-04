const Fundingsource = require('../../models/common/fundingSource.model');

const defaultFundingSources = [
  {
    title: 'Hamden Cabs',
    contactNumber: '+12035551234',
    phoneNumber: '+12035555678',
    email: 'support@hamdencabs.com',
    timeZone: 'America/New_York',
    address: {
      name: '123 Main St, Hamden, CT 06514, USA',
      coords: [-72.9279, 41.3959],
      city: 'Hamden',
      state: 'Connecticut',
      zipCode: '06514',
      aptSuiteRoom: '',
    },
    profileImageURL: '',
    isActive: true,
  },
  {
    title: 'Metro Transit Solutions',
    contactNumber: '+124467543897',
    phoneNumber: '+12945673456',
    email: 'info@metrotransit.com',
    timeZone: 'America/New_York',
    address: {
      name: '44 Broadway, Brooklyn, NY 11211, USA',
      coords: [-73.957, 40.708],
      city: 'Brooklyn',
      state: 'New York',
      zipCode: '11211',
      aptSuiteRoom: 'Suite 402',
    },
    profileImageURL: '',
    isActive: true,
  },
  {
    title: 'Golden Gate Mobility',
    contactNumber: '+1678456789',
    phoneNumber: '+18734678905',
    email: 'contact@goldengatemobility.org',
    timeZone: 'America/Los_Angeles',
    address: {
      name: '200 Market St, San Francisco, CA 94103, USA',
      coords: [-122.402, 37.789],
      city: 'San Francisco',
      state: 'California',
      zipCode: '94103',
      aptSuiteRoom: '',
    },
    profileImageURL: '',
    isActive: false,
  },
];

const seedFundingSources = async () => {
  try {
    const count = await Fundingsource.countDocuments();
    if (count === 0) {
      const inserted = await Fundingsource.insertMany(defaultFundingSources);
      console.log('✅ Funding sources seeded successfully');
      return inserted.map(entry => entry._id);
    } else {
      console.log('ℹ️ Funding sources already exist. Skipping seed.');
      const existing = await Fundingsource.find({}, '_id').lean();
      return existing.map(entry => entry._id);
    }
  } catch (error) {
    console.error('❌ Error seeding funding sources:', error);
    return [];
  }
};

module.exports = seedFundingSources;
