module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const session = client.startSession();
    const usersCol = db.collection('users');

    try {
      await session.withTransaction(async () => {
        // Add new field with default value (e.g., null or empty string)
        await usersCol.updateMany(
          {},
          { $set: { profileImageURL: null } },
          { session }
        );

        console.log('✅ Added profileImageURL field to all users');
      });
    } catch (error) {
      console.error('❌ Error adding profileImageURL field:', error);
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
        // Remove the field
        await usersCol.updateMany(
          {},
          { $unset: { profileImageURL: "" } },
          { session }
        );

        console.log('🗑️ Removed profileImageURL field from all users');
      });
    } catch (error) {
      console.error('❌ Error removing profileImageURL field:', error);
    } finally {
      await session.endSession();
    }
  }
};
