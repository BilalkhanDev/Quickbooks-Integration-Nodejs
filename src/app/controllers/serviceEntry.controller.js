const { default: HttpStatus } = require('http-status');
const service = require('../services/serviceEntry.service');
const catchAsync = require('../../shared/core/utils/catchAsync');

exports.create = catchAsync(async (req, res) => {
  const newEntry = await service.create(req);
  res.status(HttpStatus.CREATED).json({
    message: 'Service entry created successfully!',
    data: newEntry,
  });
});

exports.getByFleetId = catchAsync(async (req, res) => {
  const entries = await service.getByFleetId(req.params.fleetId);
  res.status(HttpStatus.OK).json(entries);
});

exports.getById = catchAsync(async (req, res) => {
  const entry = await service.getById(req.params.id);
  res.status(HttpStatus.OK).json(entry);
});

exports.update = catchAsync(async (req, res) => {
  const updated = await service.update(req);
  res.status(HttpStatus.OK).json({
    message: 'Service entry updated successfully!',
    data: updated,
  });
});
