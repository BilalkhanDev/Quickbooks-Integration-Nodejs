module.exports = {
  async up(db, client) {
    console.log("🧪 Test migration running");
    console.log("Database name:", db.databaseName);
    
    const collections = await db.listCollections().toArray();
    console.log("Available collections:", collections.map(c => c.name));
    
    return Promise.resolve();
  },

  async down(db, client) {
    console.log("🧪 Test migration rollback");
    return Promise.resolve();
  }
};