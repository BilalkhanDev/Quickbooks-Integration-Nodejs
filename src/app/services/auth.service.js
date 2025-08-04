const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiError = require('../../shared/core/exceptions/apiError');
const GenericService = require('../../shared/service/genric.service');
const { User } = require('../models');



exports.create = async ({ email, password }) => {
  const existingUser = await GenericService.findOne(User, { email });

  if (existingUser) {
    throw new ApiError('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await GenericService.create(User, {
    email,
    password: hashedPassword,
  });

  return user;
};

exports.authenticateUser = async (email, password) => {
  const user = await GenericService.findOne(User, { email});

  if (!user) {
    throw new ApiError('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError('Invalid credentials');
  }

  const payload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
};



