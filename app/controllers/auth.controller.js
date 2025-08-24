// controllers/auth.controller.js
const catchAsync = require('../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');
const BaseController = require('./base.controller');  
const authService = require('../services/auth.service'); 
const ApiError = require('../shared/core/exceptions/ApiError');
const tokenProvider = require('../shared/security/tokenProvider');
const pick = require('../shared/core/utils/pick');

class AuthController extends BaseController {
  constructor() {
    super(authService);  
  }
  
  register = catchAsync(async (req, res) => {
    const user =await  this.service.register(req.body); 
    return this.sendSuccessResponse(res, HttpStatus.OK, user);
  });

  
  login = catchAsync(async (req, res) => {
    const { accessToken, refreshToken } = await this.service.authenticateUser(req.body);
    return this.sendSuccessResponse(res, HttpStatus.OK,{ accessToken, refreshToken });
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
 return this.sendSuccessResponse(res, HttpStatus.OK, tokens);
});

  getProfile = catchAsync(async (req, res) => {
    const userProfile = await this.service.getProfile(req.user.id);
    return this.sendSuccessResponse(res, HttpStatus.OK, userProfile);
 
  });
    getAll = catchAsync(async (req, res) => {
      const queryParams = pick(req.query, ['search', 'isActive']);
      const options = pick(req.query, ['sortBy', 'limit', 'page']);
      const result = await this.service.getAll(queryParams, options);
      return this.sendSuccessResponse(res, HttpStatus.OK, result);
    });
}

module.exports = new AuthController();
