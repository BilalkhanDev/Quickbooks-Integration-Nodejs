const bcrypt = require('bcryptjs'); // or your PasswordHasher
const { User } = require('../models');

const createAdminUser  = async (roles) => {
  try {
    const usersToSeed = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin1234',  // raw password
        role: roles[0],
      },
      {
        username: 'alexBrown',
        email: 'alex@gmail.com',
        password: 'alexBrown1234',  // raw password
        role: roles[1],
      },
    ];

    const createdUserIds = [];

    for (const user of usersToSeed) {
      const existing = await User.findOne({ email: user.email });
      if (existing) {
        console.log(`ℹ️ User ${user.email} already exists`);
        createdUserIds.push(existing._id);
        continue;
      }

      // Hash the password before saving
      user.password = await bcrypt.hash(user.password, 10);

      const newUser = await User.create(user);
      console.log(`✅ User ${user.email} created`);
      createdUserIds.push(newUser._id);
    }

    return createdUserIds;
  } catch (error) {
    console.error('❌ Error creating users:', error);
    return [];
  }
};
module.exports=createAdminUser 
