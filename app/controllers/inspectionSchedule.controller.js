const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const catchAsync = require('../shared/core/utils/catchAsync');
const inspectionScheduleService = require('../services/inspectionSchedule.service');

class InspectionScheduleController extends BaseController {
  constructor() {
    super(inspectionScheduleService);
  }
  create = catchAsync(async (req, res) => {
    const data = await this.service.create(req);
    return this.sendSuccessResponse(res, HttpStatus.CREATED, data);
  });

  getAll=catchAsync(async (req, res) => {
    const data = await this.service.getAll(req);
    return this.sendSuccessResponse(res, HttpStatus.CREATED, data);
  });

}

module.exports = new InspectionScheduleController();
