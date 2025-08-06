// controllers/driver.controller.js
const driverService = require('../services/driver.service');
const pick = require('../../shared/core/utils/pick');
const { default: HttpStatus } = require('http-status');
const catchAsync = require('../../shared/core/utils/catchAsync');

exports.getAll = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const queryParams = pick(req.query, ['search', 'assigned','isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const drivers = await driverService.getAll(queryParams, options, userId);
  res.status(HttpStatus.OK).json(drivers);
});

exports.getById = catchAsync(async (req, res) => {
  const driver = await driverService.getById(req.params.id);
  if (!driver) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Driver not found' });
  }
  res.json(driver);
});

exports.getByFleetId = catchAsync(async (req, res) => {
  const drivers = await driverService.getByFleetId(req.params.fleetId);
  res.json(drivers);
});

exports.create = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const driver = await driverService.create(req.body, userId);
  res.status(HttpStatus.CREATED).json(driver);
});

exports.update = catchAsync(async (req, res) => {
  const driver = await driverService.update(req.params.id, req.body);
  if (!driver) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Driver not found' });
  }
  res.json(driver);
});
