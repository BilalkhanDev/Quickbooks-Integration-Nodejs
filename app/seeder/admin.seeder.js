const bcrypt = require('bcryptjs');
const { USER_ROLES } = require('../shared/constants/role');
const User = require('../models/user.model');

const createUsers = async () => {
  try {
    const usersToSeed = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin1234',
        role: USER_ROLES.ADMIN,
      },
      {
        username: 'alexBrown',
        email: 'alex@gmail.com',
        password: 'alexBrown1234',
        role: USER_ROLES.USER,
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

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({
        ...user,
        password: hashedPassword,
      });

      console.log(`✅ User ${user.email} created`);
      createdUserIds.push(newUser._id);
    }

    return createdUserIds;
  } catch (error) {
    console.error('❌ Error creating users:', error);
    return [];
  }
};

module.exports = createUsers;
