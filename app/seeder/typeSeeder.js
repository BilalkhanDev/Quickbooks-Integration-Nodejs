const mongoose = require('mongoose');
const FleetType = require('../models/fleetType');

const defaultTypes = [
  { name: 'Car', isRemoveAble: true, isDefault: true },
  { name: 'ATV', isRemoveAble: true },
  { name: 'Backhoe Loader', isRemoveAble: true },
  { name: 'Boat', isRemoveAble: true },
  { name: 'Bus', isRemoveAble: true },
  { name: 'Dozer', isRemoveAble: true },
  { name: 'Excavator', isRemoveAble: true },
  { name: 'ext', isRemoveAble: true },
  { name: 'Ext 148°', isRemoveAble: false },
  { name: 'Forklift', isRemoveAble: true },
  { name: 'Generator', isRemoveAble: true },
  { name: 'Hybrid Sedan', isRemoveAble: false },
  { name: 'Lift', isRemoveAble: true },
  { name: 'Lift-Van', isRemoveAble: false },
  { name: 'Loader', isRemoveAble: true },
  { name: 'mini', isRemoveAble: true },
  { name: 'Mini-Van', isRemoveAble: false },
  { name: 'Motorcycle', isRemoveAble: true },
  { name: 'Motor Grader', isRemoveAble: true },
  { name: 'Mower', isRemoveAble: true },
  { name: 'Off-highway Truck', isRemoveAble: true },
  { name: 'Other', isRemoveAble: true },
  { name: 'Pickup Truck', isRemoveAble: true },
  { name: 'Ramp-Van', isRemoveAble: false },
  { name: 'Semi Truck', isRemoveAble: true },
  { name: 'Skid-Steer', isRemoveAble: true },
  { name: 'SUV', isRemoveAble: true },
  { name: 'Telehandler', isRemoveAble: true },
  { name: 'Track Loader', isRemoveAble: true },
  { name: 'Trailer', isRemoveAble: true },
  { name: 'Van', isRemoveAble: true },
  { name: 'Wheel Loader', isRemoveAble: true },
  { name: 'Wheel Tractor Scraper', isRemoveAble: true },
];

const seedFleetTypes = async () => {
  try {
    const count = await FleetType.countDocuments();
    if (count === 0) {
      const fleetTypes = await FleetType.insertMany(defaultTypes);
      console.log('✅ Fleet types seeded');
      return fleetTypes[0]?._id || null;
    } else {
      console.log('ℹ️ Fleet types already exist, skipping seed');
      const existing = await FleetType.findOne({});
      return existing?._id || null;
    }
  } catch (error) {
    console.error('❌ Error seeding fleet types:', error);
    return null;
  }
};

module.exports = seedFleetTypes;
