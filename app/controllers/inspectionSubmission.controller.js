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
    const userId = req.user.id;
   
   const {id}=req.params
    const template = await inspectionSubmissionService.findOne({id});
    console.log(template)
    const submission = await this.service.getByInspectionAndFleet(inspectionId, userId);

    const valuesMap = {};
    if (submission?.itemValues) {
      for (const val of submission?.itemValues) {
        valuesMap[val.itemId] = val.value;
      }
    }

    const itemsWithValues = template?.items.map((item) => ({
      ...item,
      value: valuesMap[item.itemId] ?? '',
    }));

    return this.sendSuccessResponse(res, 
       HttpStatus.OK,
     
      {
        _id: submission?._id ?? null,
        name: template?.name,
        description: template?.description,
        fleetId: submission?.fleetId ?? null,
        inspectedBy: submission?.inspectedBy ?? { email: null, name: null },
        inspectionDate: submission?.inspectionDate ?? null,
        sections: template?.sections,
        items: itemsWithValues,
      },
    );
  });

  getAll = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { fleetId } = pick(req.query, ['fleetId']);

    const data = await this.service.getAllByFleetId(fleetId, userId);

    return this.sendSuccessResponse(res, HttpStatus.OK,data);
  });

 
}

module.exports = new InspectionSubmissionController();
