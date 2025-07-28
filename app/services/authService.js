const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser} = require('../dal/authDal');

const { findUserDal } = require('../dal/userDal');

const createNewUser = async ({email, password }) => {
  const existingUser = await findUserDal(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser(email, hashedPassword);
};

const checkIfUserIsBlocked = async (email) => {
  return await isUserBlocked(email);
};

const authenticateUser = async (email, password) => {
  const user = await findUserDal(email);
    if (!user) {
    throw new Error('User not found')
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  const refreshToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};


module.exports = {
  createNewUser,
  authenticateUser,
  checkIfUserIsBlocked,

};
