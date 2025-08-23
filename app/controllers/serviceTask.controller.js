// controllers/serviceEntry.controller.js
const HttpStatus = require('http-status').default;
const serviceTaskService = require('../services/serviceTask.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');
const BaseController = require('./base.controller');


class ServiceTaskController extends BaseController {
  constructor() {
    super(serviceTaskService);
  }
  getAll = catchAsync(async (req, res) => {
    const queryParams = pick(req.query, ['search', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const drivers = await this.service.getAll(queryParams, options);
    return this.sendSuccessResponse(res, HttpStatus.OK,drivers);
  });

}

module.exports = new ServiceTaskController();
