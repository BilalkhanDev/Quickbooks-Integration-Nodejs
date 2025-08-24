const HttpStatus = require('http-status').default;
const AuthService = require('../services/auth.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');
const AuthController = require('./auth.controller');

class UserController extends AuthController{
  constructor() {
    super(AuthService);
  }
  getAll = catchAsync(async (req, res) => {
    const queryParams = pick(req.query, ['search', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await this.service.getAll(queryParams, options);
    return this.sendSuccessResponse(res, HttpStatus.OK, result);
  });
  getById=catchAsync(async (req, res) => {
  
    const result = await this.service.getById(req.user.id);
    return this.sendSuccessResponse(res, HttpStatus.OK, result);
  })

}

module.exports = new UserController();
