// src/security/token-provider.js

const jwt = require('jsonwebtoken');
const ApiError = require('../core/exceptions/ApiError');

class TokenProvider {
  #accessSecret; 
  #refreshSecret; 

  constructor() {
    // The secrets should be loaded from environment variables or configuration
    this.#accessSecret = process.env.JWT_SECRET; 
    this.#refreshSecret = process.env.JWT_REFRESH_SECRET;
  }

  // Generate access token
  generateAccessToken(payload) {
    return jwt.sign(payload, this.#accessSecret, { expiresIn: '15m' });  // Using private secret
  }

  // Generate refresh token
  generateRefreshToken(payload) {
    return jwt.sign(payload, this.#refreshSecret, { expiresIn: '7d' });  // Using private secret
  }

  // Verify access token
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.#accessSecret);  // Verifying with private secret
    } catch (error) {
      throw new ApiError('Invalid access token');
    }
  }

  // Verify refresh token
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.#refreshSecret);  // Verifying with private secret
    } catch (error) {
      throw new ApiError('Invalid refresh token');
    }
  }
}

module.exports = new TokenProvider();
