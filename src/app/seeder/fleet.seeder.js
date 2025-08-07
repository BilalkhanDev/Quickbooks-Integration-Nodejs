const mongoose = require('mongoose');
const Fleet = require('../models/fleet.model');

const seedFleet = async ({
  userIds,
  losId,
  spaceTypeId,
  fundingSourceId,
  serviceAreaId,
  equipmentId,
  companyId,
  fuelTypeId,
  fleetTypeId,
}) => {
  try {
    const count = await Fleet.countDocuments();  // Check if fleets already exist
    if (count === 0) {
      const defaultFleets = [
        {  
          user: userIds[0],  
          setiDecall: 'SETI001',
          serviceAreas: serviceAreaId,
          los: losId,
          spaceType: spaceTypeId,
          type: fleetTypeId,
          group: companyId,
          bodyType: 'Full-Cut',
          capacity: '4',
          equipments: equipmentId,
          fundingSources: fundingSourceId,
          vin: '1HGCM82633A123456',
          gasCardNumber: 'GC1234567890',
          driverCarYear: '2020',
          driverCarNumber: 'ABC-1234',
          driverCarColor: 'White',
          driverCarModel: 'Toyota Sienna',
          fuelType: fuelTypeId,
          realOdometer: '50000',
          limitation: 'No smoking',
          notes: 'Primary city fleet',
        },
      ];

      // Insert default fleets
      const fleets = await Fleet.insertMany(defaultFleets);
      console.log('✅ Fleets seeded successfully');

      // Return the IDs of the seeded fleets
      return fleets.map(fleet => fleet._id);
    } else {
      console.log('ℹ️ Fleets already exist. Skipping seed.');
      return [];  // Return empty array if fleets already exist
    }
  } catch (error) {
    console.error('❌ Error seeding fleets:', error);
    return [];  // Return empty array in case of error
  }
};

module.exports = seedFleet;
