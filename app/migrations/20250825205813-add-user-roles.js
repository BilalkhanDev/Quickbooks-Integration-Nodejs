module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const session = client.startSession();
    const usersCol = db.collection('users');
    const rolesCol = db.collection('roles');

    try {
      await session.withTransaction(async () => {
        // 1. Fetch all roles from the roles collection
        const roles = await rolesCol.find({}, { session }).toArray();

        // Create a map of role name -> ObjectId
        const roleNameToId = {};
        roles.forEach(role => {
          roleNameToId[role.name] = role._id;
        });

        // 2. Fetch all users that need to be updated
        const usersToUpdate = await usersCol.find({}).toArray();

        // 3. Update each user with the correct role ObjectId
        for (const user of usersToUpdate) {
          const currentRole = user.role; // Current role (could be string or ObjectId)
          
          // If the role is a string, map it to ObjectId
          if (typeof currentRole === 'string' && roleNameToId[currentRole]) {
            // If the role is found in the map, update the user with the correct ObjectId
            await usersCol.updateOne(
              { _id: user._id },
              { $set: { role: roleNameToId[currentRole] } },
              { session }
            );
            console.log(`✅ User ${user.email} updated with role ${currentRole}`);
          }
        }
      });
    } catch (error) {
      console.error('❌ Error updating user roles:', error);
    } finally {
      await session.endSession();
    }
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    const session = client.startSession();
    const usersCol = db.collection('users');

    try {
      await session.withTransaction(async () => {
        // 1. Revert the users' role fields to a default value, if needed
        await usersCol.updateMany(
          {},
          { $set: { role: 'default' } }, // Or set any default value (e.g., null, 'user', etc.)
          { session }
        );
        console.log('🗑️ Reverted user roles to default');
      });
    } catch (error) {
      console.error('❌ Error reverting user roles:', error);
    } finally {
      await session.endSession();
    }
  }
};
