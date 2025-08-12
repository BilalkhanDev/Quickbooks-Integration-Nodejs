const { default: HttpStatus } = require('http-status');
const equipmentService = require('../../services/common/equipment.service');
const pick = require('../../shared/core/utils/pick');
const catchAsync = require('../../shared/core/utils/catchAsync');


exports.create = catchAsync(async (req, res) => {
  const result = await equipmentService.create(req.body);
  res.status(HttpStatus.CREATED).send(result);

});

exports.getById = catchAsync(async (req, res) => {

  const result = await equipmentService.getById(req.params.id);
  if (!result) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Addon not found' });
  }
  res.send(result);

});

exports.getAll = catchAsync(async (req, res) => {
  const queryParams = pick(req.query, ['search', 'role', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await equipmentService.getAll(queryParams, options);
  res.send(result);

})

exports.update = catchAsync(async (req, res) => {
  const result = await equipmentService.update(req.params.id, req.body);
  res.send(result);

});

exports.remove = catchAsync(async (req, res) => {

  const result = await equipmentService.update(req.params.id, req.body);
  res.send(result);

});
