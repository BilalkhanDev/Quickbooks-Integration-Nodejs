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

  getByFleetId = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { fleetId } = pick(req.params, ['fleetId']);
    const queryParams = pick(req.query, ['search', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const entries = await this.service.getByFleetId(queryParams, options, userId, fleetId);

    return this.sendSuccessResponse(res, HttpStatus.OK, 'Service entries fetched successfully',entries);
  });
}

module.exports = new ServiceEntryController();
