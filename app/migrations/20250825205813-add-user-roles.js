module.exports = {
  async up(db, client) {
    console.log("🟢 Migration started - up method called");
    
    const session = client.startSession();
    const usersCol = db.collection('users');
    const rolesCol = db.collection('roles');

    process.stdout.write("🟢 Starting round-robin role assignment...\n");
    console.log("Bilal - Debug point reached");

    try {
      await session.withTransaction(async () => {
        console.log("📍 Inside transaction");
        
        // 1. Get all roles
        const roles = await rolesCol.find({}, { session }).toArray();
        console.log(`📊 Found ${roles.length} roles:`, roles.map(r => r.name));
        
        if (roles.length === 0) throw new Error("No roles found");

        // 2. Get all users  
        const users = await usersCol.find({}, { session }).toArray();
        console.log(`👥 Found ${users.length} users:`, users.map(u => u.email));
        
        if (users.length === 0) {
          process.stdout.write("⚠️ No users found to update.\n");
          return;
        }

        // 3. Assign roles one by one
        console.log("🔄 Starting role assignment loop");
        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          const roleToAssign = roles[i % roles.length];

          console.log(`🎯 Assigning role ${roleToAssign.name} to ${user.email}`);
          
          const updateResult = await usersCol.updateOne(
            { _id: user._id },
            { $set: { role: roleToAssign._id } },
            { session }
          );

          console.log(`📝 Update result:`, updateResult);
          process.stdout.write(`✅ Assigned role '${roleToAssign.name}' to user '${user.email}'\n`);
        }
        
        console.log("🏁 Loop completed");
      });

      process.stdout.write("✅ Round-robin role assignment complete.\n");
      console.log("✅ Migration completed successfully");
      
    } catch (error) {
      console.error("❌ Error in migration:", error);
      process.stdout.write(`❌ Error assigning roles: ${error.message}\n`);
      throw error; // Re-throw to mark migration as failed
    } finally {
      await session.endSession();
      console.log("🔚 Session ended");
    }
  },

  async down(db, client) {
    console.log("↩️ Migration down method called");
    // ... rest of your down method with similar logging
  }
};