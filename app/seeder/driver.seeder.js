const bcrypt = require('bcryptjs');
const { USER_ROLES } = require('../shared/constants/role');
const { Driver, User, ServiceArea, Fleet } = require('../models/index');  // Import the necessary models

const createDrivers = async ({ userIds,fleetId,serviceAreaId }) => {

  try {
    // Define drivers to be seeded
    const driversToSeed = [
      {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        license: 'A1234567',
        email: 'johndoe@gmail.com',
        contactNumber: '1234567890',
        garageAddress: '123 Main St, Los Angeles, CA',
        serviceArea: serviceAreaId, 
        fleet: fleetId[0],             
        startDate: new Date('2025-01-01'),
        endDate: null,
        isActive: true,
        user: userIds[0],           
      },
    ];

   const count = await Driver.countDocuments()

    if (count === 0) {
         await Driver.insertMany(driversToSeed);
         console.log('✅ Driver seeded successfully');
       } else {
         console.log('ℹ️ Driver already exist, skipping seed');
       }
  
  } catch (error) {
    console.error('❌ Error creating drivers:', error);
    return [];
  }
};

module.exports = createDrivers;
