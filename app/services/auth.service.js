const { User } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const GenericService = require('../services/generic.service');
const { TokenProvider, PaswordHasher } = require('../shared/security');
const paswordHasher = require('../shared/security/paswordHasher');

class AuthService extends GenericService {
  constructor() {
    super(User); 
  }

  async register(data) {
    const {email,password,username}=data
    const existingUser = await this.findOne({ email });
    if (existingUser) {
      throw new ApiError(HttpStatus.BAD_REQUEST,'User already exists');
    }
    const isDuplicate = await this.model.isTitleTaken(username);
    if (isDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Username already taken');
    }
    const hashedPassword = await PaswordHasher.hash(password);
    const user = await this.create({
      email,
      username,
      password: hashedPassword,
      ...data
    });
  
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      timeZone: user.timeZone
    };
  }

 async authenticateUser(body) {
  const { email, password } = body;
  const user = await this.findOne({ email });
  
  if (!user) {
    throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
  }  const isMatch = await paswordHasher.compare(password, user.password); 
  if (!isMatch) {
    throw new ApiError(HttpStatus.FORBIDDEN, 'Invalid credentials');
  }
  
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
      timeZone: user.timeZone, 
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
      timeZone:user.timeZone,
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
