
const fleetSpecService = require('../services/fleetSpecf.service');
const { default: HttpStatus } = require('http-status');
const catchAsync = require('../../shared/core/utils/catchAsync');

exports.getById = catchAsync(async (req, res) => {
  const spec = await fleetSpecService.getFleetSpec(req.params.fleetId);
  res.status(HttpStatus.OK).json(spec);
});

exports.update = catchAsync(async (req, res) => {
  const { fleetId } = req.params;
  const updatedFleet = await fleetSpecService.update(fleetId, req.body);
  res.status(HttpStatus.OK).json(updatedFleet);
});
