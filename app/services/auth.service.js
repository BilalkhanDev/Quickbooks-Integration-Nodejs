const { User } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const GenericService = require('../services/generic.service');
const { TokenProvider, PaswordHasher } = require('../security');

class AuthService extends GenericService {
  constructor() {
    super(User); 
  }

  // Register user
  async register({ email, password }) {
    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new ApiError('User already exists');
    }

    // Use PasswordHasher to hash the password
    const hashedPassword = await PaswordHasher.hash(password); // Password hashing logic encapsulated in PasswordHasher
    return await this.create({ 
      email,
      password: hashedPassword,
    });
  }

  // Authenticate user and generate tokens
  async authenticateUser(email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      throw new ApiError('User not found');
    }

    // Use PasswordHasher to compare the password
    const isMatch = await PaswordHasher.compare(password, user.password); // Password comparison logic encapsulated in PasswordHasher
    if (!isMatch) {
      throw new ApiError('Invalid credentials');
    }

    // Generate tokens after successful authentication
    const payload = { id: user.id, role: user.role };
    const accessToken = TokenProvider.generateAccessToken(payload);
    const refreshToken = TokenProvider.generateRefreshToken(payload);

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

  // Get user profile
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

  // Generate access and refresh tokens using TokenProvider
  generateTokens(payload) {
    const accessToken = TokenProvider.generateAccessToken(payload);
    const refreshToken = TokenProvider.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }
}

module.exports = new AuthService();
