const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const catchAsync = require('../shared/core/utils/catchAsync');
const inspectionScheduleService = require('../services/inspectionSchedule.service');

class InspectionScheduleController extends BaseController {
  constructor() {
    super(inspectionScheduleService);
  }
  create = catchAsync(async (req, res) => {
    const data = await this.service.createOrUpdate(req);
    return this.sendSuccessResponse(res, HttpStatus.CREATED, data);
  });

  getAll=catchAsync(async (req, res) => {
    const {fleetId}=req.params
    const data = await this.service.getAll(fleetId);
    return this.sendSuccessResponse(res, HttpStatus.OK, data);
  });
  getById=catchAsync(async (req, res) => {
    // it shold be the id of inspection not object id 
    const {id}=req.params
    const data = await this.service.getById(id);
    return this.sendSuccessResponse(res, HttpStatus.OK, data);
  });


}

module.exports = new InspectionScheduleController();
