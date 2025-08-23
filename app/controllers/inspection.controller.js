// controllers/inspection.controller.js
const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const inspectionService = require('../services/inspection.service');
const catchAsync = require('../shared/core/utils/catchAsync');

class InspectionController extends BaseController {
  constructor() {
    super(inspectionService);
  }

  getName = catchAsync(async (req, res) => {
    const inspections = await this.service.getNames();
    return this.sendSuccessResponse(res,  HttpStatus.OK, inspections);
  });

}

module.exports = new InspectionController();
