// controllers/fleet.controller.js
const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const fleetService = require('../services/fleet.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');

class FleetController extends BaseController {
  constructor() {
    super(fleetService);
  }

  create = catchAsync(async (req, res) => {
    const fleet = await this.service.create(req);
    return this.sendSuccessResponse(res, HttpStatus.CREATED,fleet);
  });

  // Override: custom query param filtering
  getAll = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const queryParams = pick(req.query, ['search', 'status', 'type', 'group', 'assigned']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const fleets = await this.service.getAll(queryParams, options, userId);
    return this.sendSuccessResponse(res, HttpStatus.OK, 'Fleets fetched', fleets);
  });

  // Custom method
  getFleetSpec = catchAsync(async (req, res) => {
    const fleets = await this.service.getFleetSpec(req);
    return this.sendSuccessResponse(res, HttpStatus.OK, 'Fleet specs fetched', fleets);
  });

}

// Export a singleton instance
module.exports = new FleetController();
