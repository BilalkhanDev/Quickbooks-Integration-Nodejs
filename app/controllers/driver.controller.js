// controllers/driver.controller.js
const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const driverService = require('../services/driver.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');

class DriverController extends BaseController {
  constructor() {
    super(driverService);
  }
  getAll = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const queryParams = pick(req.query, ['search', 'assigned', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const drivers = await this.service.getAll(queryParams, options, userId);
    return this.sendSuccessResponse(res, HttpStatus.OK,drivers);
  });

  getByFleetId = catchAsync(async (req, res) => {
    const drivers = await this.service.getByFleetId(req.params.fleetId);
    return this.sendSuccessResponse(res, HttpStatus.OK, drivers);
  });

  create = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const driver = await this.service.create(req.body, userId);
    return this.sendSuccessResponse(res, HttpStatus.CREATED, driver);
  });
}

module.exports = new DriverController();
