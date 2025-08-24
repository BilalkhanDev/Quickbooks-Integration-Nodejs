const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const inspectionSubmissionService = require('../services/inspectionSubmission.service');
const inspectionService = require('../services/inspection.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');

class InspectionSubmissionController extends BaseController {
  constructor() {
    super(inspectionSubmissionService);
  }

  createOrUpdate = catchAsync(async (req, res) => {
    const submission = await this.service.createOrUpdate(req);
    return this.sendSuccessResponse(res,  HttpStatus.OK,submission);
  });

  getSingle = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { inspectionId, fleetId } = req.query;

    const submission = await this.service.getByInspectionAndFleet(inspectionId, fleetId, userId);

    return this.sendSuccessResponse(res, HttpStatus.OK, submission);
  });

  getAggregatedFormForFleet = catchAsync(async (req, res) => {
  const { id } = req.params;

  const submission = await inspectionSubmissionService.getById(id);
  const template = await inspectionService.findById(submission?.inspectionId?._id);

  const valuesMap = {};

  if (submission?.inspectionId?.items && submission?.inspectionId?.items.length > 0) {
    submission?.inspectionId?.items.forEach(val => {
      valuesMap[val.itemId] = val.value; 
    });
  } else {
    console.log("No itemValues found in submission.");
  }

  const itemsWithValues = template?.items?.map((item) => {
    const itemValue = valuesMap[item?.itemId] ?? ''; 
    return {
      itemId: item.itemId,
      name: item.name,
      type: item.type,
      value: itemValue,  // Assign mapped value or default to empty string
      order: item.order,
      required: item.required,
      sectionId: item.sectionId,
      options: item.options,  // Include options only for dropdown/checkbox
    };
  });

  return this.sendSuccessResponse(res, HttpStatus.OK, {
    _id: submission?._id ?? null,
    name: template?.name,
    description: template?.description,
    fleetId: submission?.fleet?._id ?? null,
    inspectedBy: submission?.inspectedBy ?? { email: null, name: null },
    inspectionDate: submission?.inspectionDate ?? null,
    sections: template?.sections,
    items: itemsWithValues,
  });
});



  getAll = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { fleetId } = pick(req.query, ['fleetId']);

    const data = await this.service.getAllByFleetId(fleetId, userId);

    return this.sendSuccessResponse(res, HttpStatus.OK,data);
  });

 
}

module.exports = new InspectionSubmissionController();
