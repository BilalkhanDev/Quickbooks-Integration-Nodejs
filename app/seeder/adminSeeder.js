const bcrypt = require('bcryptjs');
const { USER_ROLES } = require('../constants/role');
const User = require('../models/user'); // Make sure model name is capitalized

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ role: USER_ROLES.ADMIN });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: USER_ROLES.ADMIN
    });

    await adminUser.save(); // ✅ correctly saving the Mongoose document
    console.log('Admin user created successfully');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

module.exports =  createAdminUser 
