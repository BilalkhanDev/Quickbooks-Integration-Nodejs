// controllers/auth.controller.js
const catchAsync = require('../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');
const BaseController = require('./base.controller');  
const authService = require('../services/auth.service'); 
const ApiError = require('../shared/core/exceptions/ApiError');
const tokenProvider = require('../shared/security/tokenProvider');
const pick = require('../shared/core/utils/pick');
const { getAuthorizationUrl, getTokensFromCode } = require('../config/quickbook.config');

class AuthController extends BaseController {
  constructor() {
    super(authService);  
  }
    authenticate = catchAsync(async (req, res) => {
    const authorizationUrl =getAuthorizationUrl();
    return res.redirect(authorizationUrl);
  });

  oauthCallback = catchAsync(async (req, res) => {
    const { access_token, refresh_token, realmId } = await getTokensFromCode(req)
    await this.service.saveQuickBooksTokens(access_token, refresh_token, realmId);
    return this.sendSuccessResponse(res, HttpStatus.OK, {
      accessToken: access_token,
      refreshToken: refresh_token,
      realmId
    });

  })


}

module.exports = new AuthController();
