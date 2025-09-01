module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const session = client.startSession();
    const rolesCol = db.collection('roles');

    try {
      await session.withTransaction(async () => {
        // Copy `name` into new `type` field
        await rolesCol.updateMany(
          {},
          [
            {
              $set: { type: "$name" }
            }
          ],
          { session }
        );

        console.log("✅ Added 'type' field to roles with same value as 'name'");
      });
    } catch (error) {
      console.error("❌ Error adding 'type' field:", error);
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
    const rolesCol = db.collection('roles');

    try {
      await session.withTransaction(async () => {
        // Remove the 'type' field
        await rolesCol.updateMany(
          {},
          { $unset: { type: "" } },
          { session }
        );

        console.log("🗑️ Removed 'type' field from roles");
      });
    } catch (error) {
      console.error("❌ Error removing 'type' field:", error);
    } finally {
      await session.endSession();
    }
  }
};
