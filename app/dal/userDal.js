const User = require('../models/user');
const { USER_ROLES } = require('../constants/role');

// Get all users excluding admins, with pagination
const getAllUsersDal = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;

  const users = await User.find({ role: { $ne: USER_ROLES.ADMIN } })
    .select('username email role createdAt updatedAt') // Exclude password
    .sort({ _id: 1 }) // MongoDB uses _id instead of id
    .skip(skip)
    .limit(limit);

  return users;
};

// Find user by ID (excluding password)
const findUserByIdDal = async (id) => {
  const user = await User.findById(id).lean();

  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return null;
};

// Find user by username OR email
const findUserDal = async (identifier) => {
  return await User.findOne({
    $or: [{ email: identifier }],
  });
};

module.exports = {
  getAllUsersDal,
  findUserByIdDal,
  findUserDal,
};
