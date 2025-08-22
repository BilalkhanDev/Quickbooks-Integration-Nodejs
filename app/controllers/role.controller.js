// controllers/serviceEntry.controller.js
const HttpStatus = require('http-status').default;
const RoleService = require('../services/role.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');
const BaseController = require('./base.controller');


class RoleController extends BaseController {
  constructor() {
    super(RoleService);
  }
  getAll = catchAsync(async (req, res) => {
      const queryParams = pick(req.query, ['search','isActive']);
      const options = pick(req.query, ['sortBy', 'limit', 'page']);
      const result = await this.service.getAll(queryParams, options);
      return this.sendSuccessResponse(res, HttpStatus.OK,result);
    });
  
}

module.exports = new RoleController();
