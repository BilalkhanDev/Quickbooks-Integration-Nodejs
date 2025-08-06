// controllers/inspectionSubmission.controller.js
const inspectionSubmissionService = require('../services/inspectionSubmission.service');
const inspectionService = require('../services/inspection.service'); 
const catchAsync = require('../../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');
const pick = require('../../shared/core/utils/pick');

exports.createOrUpdate = catchAsync(async (req, res) => {
  const submission = await inspectionSubmissionService.createOrUpdate(req);
  res.status(HttpStatus.OK).json({ success: true, data: submission });
});

exports.getSingle = catchAsync(async (req, res) => {
  const userId=req.user.id
  const { inspectionId, fleetId } = req.query;
  const submission = await inspectionSubmissionService.getByInspectionAndFleet(inspectionId, fleetId,userId);
  res.status(HttpStatus.OK).json({ success: true, data: submission });
});

exports.getAggregatedFormForFleet = catchAsync(async (req, res) => {


    const userId = req.user.id
  const {  fleetId } = pick(req.query, ['fleetId']);
 
  const template = await inspectionService.getById(inspectionId);
  const submission = await inspectionSubmissionService.getByInspectionAndFleet(fleetId,userId);

  const valuesMap = {};
  if (submission?.itemValues) {
    for (const val of submission.itemValues) {
      valuesMap[val.itemId] = val.value;
    }
  }

  const itemsWithValues = template.items.map(item => ({
    ...item,
    value: valuesMap[item.itemId] ?? ""
  }));

  res.status(HttpStatus.OK).json({
    success: true,
    data: {
      _id: submission?._id ?? null,
      name: template.name,
      description: template.description,
      fleetId: submission?.fleetId ?? null,
      inspectedBy: submission?.inspectedBy ?? { email: null, name: null },
      inspectionDate: submission?.inspectionDate ?? null,
      sections: template.sections,
      items: itemsWithValues
    }
  });
});

exports.getAll= catchAsync(async (req, res) => {
  const userId = req.user.id
  const {  fleetId } = pick(req.query, ['fleetId']);
  const data = await inspectionSubmissionService.getAllByFleetId(fleetId,userId);
 res.status(HttpStatus.OK).json({ success: true, data });
  
});

exports.getById = catchAsync(async (req, res) => {
  const submission = await inspectionSubmissionService.getById(req.params.id);
  res.status(HttpStatus.OK).json({ success: true, data: submission });
});
