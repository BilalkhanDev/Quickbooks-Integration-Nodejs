// controllers/inspection.controller.js
const inspectionService = require('../services/inspection.service');
const catchAsync = require('../../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');

exports.getAll = catchAsync(async (req, res) => {
  const inspections = await inspectionService.getAll();
  res.status(HttpStatus.OK).json({ success: true, data: inspections });
});

exports.getName = catchAsync(async (req, res) => {
  
  const inspections = await inspectionService.getNames();
  res.status(HttpStatus.OK).json({ success: true, data: inspections });
});

exports.getById = catchAsync(async (req, res) => {
  const inspection = await inspectionService.getById(req.params.id);
  res.status(HttpStatus.OK).json({ success: true, data: inspection });
});

exports.create = catchAsync(async (req, res) => {
  const newInspection = await inspectionService.create(req.body);
  res.status(HttpStatus.CREATED).json({ success: true, data: newInspection });
});

exports.update = catchAsync(async (req, res) => {
  const updatedInspection = await inspectionService.update(req.params.id, req.body);
  res.status(HttpStatus.OK).json({ success: true, data: updatedInspection });
});
