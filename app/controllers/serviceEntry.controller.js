// controllers/serviceEntry.controller.js
const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const serviceEntryService = require('../services/serviceEntry.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');

class ServiceEntryController extends BaseController {
  constructor() {
    super(serviceEntryService);
  }
  create = catchAsync(async (req, res) => {
    const result = await this.service.create(req.body);
    return this.sendSuccessResponse(res, HttpStatus.CREATED, result);
  });
  update = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await this.service.update(id, req.body);
    return this.sendSuccessResponse(res, HttpStatus.CREATED, result);
  });
  getByFleetId = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { fleetId } = pick(req.params, ['fleetId']);
    const queryParams = pick(req.query, ['search', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const entries = await this.service.getByFleetId(queryParams, options, userId, fleetId);

    return this.sendSuccessResponse(res, HttpStatus.OK,entries);
  });
  getById=catchAsync(async (req, res) => {
    const {id}=req.params
    const userId=req.user.id
    console.log("Id",id)
    const result = await this.service.getById(id, userId);
    return this.sendSuccessResponse(res, HttpStatus.CREATED, result);
  });
}

module.exports = new ServiceEntryController();
