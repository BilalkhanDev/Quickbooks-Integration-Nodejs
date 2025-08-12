const FleetStatus = require('../models/common/fleetStatus.model');

const defaultStatuses = [
  { name: 'Active', color: 'green', isDefault: true, isRemoveAble: false },
  { name: 'InShop', color: 'yellow', isRemoveAble: false },
  { name: 'Inactive', color: 'blue', isRemoveAble: true },
  { name: 'Out of Service', color: 'red', isRemoveAble: false },
  { name: 'Sold', color: 'grey', isRemoveAble: true }
];

const seedFleetStatuses = async () => {
  try {
    const count = await FleetStatus.countDocuments();
    if (count === 0) {
      await FleetStatus.insertMany(
        defaultStatuses.map((status, index) => ({
          name: status.name,
          usage: 0,
          color: status.color,
          isRemoveAble: status.isRemoveAble, 
          isDefault: status.isDefault || false
        }))
      );
      console.log('✅ Fleet statuses seeded');
    }
  } catch (error) {
    console.error('❌ Error seeding fleet statuses:', error);
  }
};

module.exports = seedFleetStatuses;
