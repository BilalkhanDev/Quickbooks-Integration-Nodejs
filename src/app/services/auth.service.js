const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const GenericService=require('../services/generic.service')
class AuthService extends GenericService {
  constructor() {
    super(User); 
  }
  async create({ email, password }) {
    const existingUser = await this.findOne({ email }); 
    if (existingUser) {
      throw new ApiError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.create({ 
      email,
      password: hashedPassword,
    });
  }

  async authenticateUser(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new ApiError('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError('Invalid credentials');
    }

    const payload = { id: user.id, role: user.role };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async getProfile(userId) {
    const user = await this.findById(userId);
    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}

module.exports = new AuthService();
