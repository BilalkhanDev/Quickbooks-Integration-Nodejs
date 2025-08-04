const Equipment = require('../../models/common/equipment.model');

const defaultEquipments = [
  {
    title: 'Wheelchair Lift',
    description: 'Hydraulic lift system for safely loading wheelchair-bound passengers into vehicles.',
    code: 'EQP-WC-LIFT',
    isActive: true,
  },
  {
    title: 'Stretcher Securement System',
    description: 'Locking stretcher harness system compliant with NEMT vehicle safety regulations.',
    code: 'EQP-STRCH-LK',
    isActive: true,
  },
  {
    title: 'Oxygen Tank Holder',
    description: 'Steel bracket system for securely holding portable oxygen tanks during transport.',
    code: 'EQP-O2-HLDR',
    isActive: true,
  },
];

const seedEquipments = async () => {
  try {
    const count = await Equipment.countDocuments();
    if (count === 0) {
      const inserted = await Equipment.insertMany(defaultEquipments);
      console.log('✅ Equipments seeded successfully');
      return inserted.map(e => e._id);
    } else {
      console.log('ℹ️ Equipments already exist, skipping seeding');
      const existing = await Equipment.find({}, '_id').lean();
      return existing.map(e => e._id);
    }
  } catch (error) {
    console.error('❌ Error seeding equipments:', error);
    return [];
  }
};

module.exports = seedEquipments;
