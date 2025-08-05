// controllers/inspectionSubmission.controller.js
const inspectionSubmissionService = require('../services/inspectionSubmission.service');
const inspectionService = require('../services/inspection.service'); 
const catchAsync = require('../../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');

exports.createOrUpdate = catchAsync(async (req, res) => {
  const submission = await inspectionSubmissionService.createOrUpdate(req);
  res.status(HttpStatus.OK).json({ success: true, data: submission });
});

exports.getSingle = catchAsync(async (req, res) => {
  const { inspectionId, fleetId } = req.query;
  const submission = await inspectionSubmissionService.getByInspectionAndFleet(inspectionId, fleetId);
  res.status(HttpStatus.OK).json({ success: true, data: submission });
});

exports.getAggregatedFormForFleet = catchAsync(async (req, res) => {
  const { inspectionId, fleetId } = req.query;

  const template = await inspectionService.getFleetSpec(inspectionId);
  const submission = await inspectionSubmissionService.getByInspectionAndFleet(inspectionId, fleetId);

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

exports.getAllAggregatedFormsForFleet = catchAsync(async (req, res) => {
  const { fleetId } = req.query;
  const submissions = await inspectionSubmissionService.getAllByFleetId(fleetId);

  const aggregated = submissions.map(sub => {
    const template = sub.inspectionId;
    const valuesMap = {};

    if (sub.itemValues) {
      for (const val of sub.itemValues) {
        valuesMap[val.itemId] = val.value;
      }
    }

    const itemsWithValues = template.items.map(item => ({
      ...item,
      value: valuesMap[item.itemId] ?? ""
    }));

    return {
      _id: sub._id,
      name: template.name,
      inspectionFormId: template._id,
      description: template.description,
      fleetId: sub.fleetId,
      inspectedBy: sub.inspectedBy,
      inspectionDate: sub.inspectionDate,
      sections: template.sections,
      items: itemsWithValues,
      status: sub.status
    };
  });

  res.status(HttpStatus.OK).json({ success: true, data: aggregated });
});

exports.getById = catchAsync(async (req, res) => {
  const submission = await inspectionSubmissionService.getById(req.params.id);
  res.status(HttpStatus.OK).json({ success: true, data: submission });
});
