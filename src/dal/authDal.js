const User = require('../app/models/user.model');
const { USER_ROLES } = require('../shared/constants/role');

const createUser = async (username, email, password) => {
  const newUser = new User({
    username,
    email,
    password,
    role: USER_ROLES.USER,
  });

  await newUser.save();

  const userObj = newUser.toObject();
  delete userObj.password;

  return userObj;
};

module.exports = {
  createUser,
};
