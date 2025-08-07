const { default: HttpStatus } = require('http-status');
const vendorService = require('../services/vendor.service');
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');


exports.create = catchAsync(async (req, res) => {
  const vendor = await vendorService.create(req.body);
  res.status(HttpStatus.CREATED).json(vendor);
});

exports.getAll = catchAsync(async (req, res) => {
  const queryParams = pick(req.query, ['search', 'classification', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const paginatedData = await vendorService.getAll(queryParams, options,);
  res.status(HttpStatus.OK).json(paginatedData);
});
exports.getById = catchAsync(async (req, res) => {
  console.log(req.body)
  const vendor = await vendorService.getById(req.params.id);
  res.status(HttpStatus.OK).json(vendor);
});
exports.update = catchAsync(async (req, res) => {
  const vendor = await vendorService.update(req.params.id, req.body);
  res.status(HttpStatus.OK).json(vendor);
});

exports.remove = catchAsync(async (req, res) => {
  await vendorService.delete(req.params.id);
  res.status(HttpStatus.OK).json({ message: 'Deleted successfully' });
});

exports.bulkDelete = catchAsync(async (req, res) => {
  const ids = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(HttpStatus.BAD_REQUEST).json({ error: 'No IDs provided for deletion.' });
  }

  await vendorService.bulkDelete(ids);
  res.status(HttpStatus.OK).json({ message: 'Bulk delete successful' });
});
