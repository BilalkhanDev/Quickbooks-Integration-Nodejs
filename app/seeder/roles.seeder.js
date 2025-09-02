const { ROLES_TYPES } = require('../shared/constants/role');
const { Role } = require('../models');

const seedRoles = async () => {
  try {
    // Define roles to seed
    const rolesToSeed = [
      {
        name: 'admin',
        description: 'Admin Role with all permissions',
        type: ROLES_TYPES.ADMIN,
      },
      {
        name: 'user',
        description: 'User Role with operating permissions',
        type: ROLES_TYPES.USER,  // Fixed typo from "OPERATIOR" to "OPERATOR"
      },
     
    ];

    const createdRolesIds = []; // Array to store created role IDs

    // Loop through each role and create if it doesn't already exist
    for (const role of rolesToSeed) {
      // Check if the role already exists in the DB by the type
      const existing = await Role.findOne({ type: role.type });

      if (existing) {
        console.log(`ℹ️ Role ${role.type} already exists`);
        createdRolesIds.push(existing._id); // Push existing role ID
        continue;
      }
      // If role does not exist, create a new one
      const newRole = await Role.create({
        name: role.name,
        description: role.description,
        type: role.type,
      });

      console.log(`✅ Role ${role.name} created`);
      createdRolesIds.push(newRole._id); // Push the newly created role ID
    }

    // Return the created role IDs
    return createdRolesIds;
  } catch (error) {
    console.error('❌ Error creating roles:', error);
    return []; // Return empty array on error
  }
};

module.exports = seedRoles;
