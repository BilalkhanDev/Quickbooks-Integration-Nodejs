// controllers/auth.controller.js
const catchAsync = require('../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');
const jwt = require('jsonwebtoken');
const BaseController = require('./base.controller');  
const authService = require('../services/auth.service'); 
const ApiError = require('../shared/core/exceptions/ApiError');
const tokenProvider = require('../shared/security/tokenProvider');

class AuthController extends BaseController {
  constructor() {
    super(authService);  
  }
  register = catchAsync(async (req, res) => {
    const user = this.create(req,res); 
    return this.sendSuccessResponse(res, HttpStatus.OK, 'User profile fetched successfully', user);
  });

  login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await this.service.authenticateUser(email, password);
    return this.sendSuccessResponse(res, HttpStatus.OK, 'Login successful', { accessToken, refreshToken, user });
  });

 refreshAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new ApiError(res, HttpStatus.UNAUTHORIZED, 'Refresh token is required');
  }

  const payload = tokenProvider.verifyRefreshToken(refreshToken);

  const tokens = await this.service.generateTokens({
    id: payload?.id,
    role: payload?.role
  });

  return res.status(HttpStatus.OK).json({
    status: 'success',
    message: 'Token refreshed successfully',
    data: tokens
  });
});

  getProfile = catchAsync(async (req, res) => {
    const userProfile = await this.service.getProfile(req.user.id);
    return this.sendSuccessResponse(res, HttpStatus.OK, 'User profile fetched successfully', userProfile);
 
  });
}

module.exports = new AuthController();
