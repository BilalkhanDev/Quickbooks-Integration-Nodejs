const { default: HttpStatus } = require('http-status');
const service = require('../services/serviceEntry.service');
const catchAsync = require('../../shared/core/utils/catchAsync');
const pick = require('../../shared/core/utils/pick');

exports.create = catchAsync(async (req, res) => {
  const newEntry = await service.create(req);
  res.status(HttpStatus.CREATED).json({
    message: 'Service entry created successfully!',
    data: newEntry,
  });
});

exports.getByFleetId = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const {fleetId}=pick(req.params,['fleetId'])
  const queryParams = pick(req.query, ['search', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const entries = await service.getByFleetId(queryParams, options, userId,fleetId);
  res.status(HttpStatus.OK).json(entries);
});

exports.getById = catchAsync(async (req, res) => {
  const userId=req.user.id
  const {id}=pick(req.params,['id'])
  const entry = await service.getById(id,userId);
  res.status(HttpStatus.OK).json(entry);
});

exports.update = catchAsync(async (req, res) => {
  const updated = await service.update(req);
  res.status(HttpStatus.OK).json({
    message: 'Service entry updated successfully!',
    data: updated,
  });
});
