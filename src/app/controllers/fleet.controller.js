const catchAsync = require('../../shared/core/utils/catchAsync');
const pick = require('../../shared/core/utils/pick');
const fleetService = require('../services/fleet.service');
const { default: HttpStatus } = require('http-status');

exports.create = catchAsync(async (req, res) => {
  const fleet = await fleetService.create(req);
  res.status(HttpStatus.CREATED).json(fleet);
})

exports.getAll = catchAsync(async (req, res) => {
  const userId = req.user.id
  const queryParams = pick(req.query, ['search', 'status', 'type', 'group', 'assigned']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const fleets = await fleetService.getAll(queryParams, options, userId);
  res.status(HttpStatus.OK).json(fleets);
});

exports.getFleetSpec = catchAsync(async (req, res) => {
  const fleets = await fleetService.getFleetSpec(req);
  res.status(HttpStatus.OK).json(fleets);

});
exports.getById = catchAsync(async (req, res) => {
  const fleet = await fleetService.getById(req.params.id);
  if (!fleet) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Fleet not found' });
  res.status(HttpStatus.OK).json(fleet);
})

exports.update = catchAsync(async (req, res) => {
  const fleet = await fleetService.updateById(req.params.id, req.body);
  if (!fleet) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Fleet not found' });
  res.status(HttpStatus.OK).json(fleet);
})

exports.remove = catchAsync(async (req, res) => {
  const deleted = await fleetService.deleteById(req.params.id);
  if (!deleted) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Fleet not found' });
  res.status(HttpStatus.OK).json({ message: 'Fleet deleted successfully' });

})


