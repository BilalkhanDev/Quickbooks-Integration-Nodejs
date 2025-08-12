const companyService = require('../services/company.service');
const { default: HttpStatus } = require('http-status');
const catchAsync = require('../shared/core/utils/catchAsync'); // Optional but recommended

exports.create = catchAsync(async (req, res) => {
  const company = await companyService.create(req.body);
  res.status(HttpStatus.CREATED).json(company);
});

exports.getAll = catchAsync(async (req, res) => {
  const companies = await companyService.getAll();
  res.status(HttpStatus.OK).json(companies);
});

exports.getById = catchAsync(async (req, res) => {
  const company = await companyService.getById(req.params.id);
  if (!company) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Company Not Found' });
  }
  res.status(HttpStatus.OK).json(company);
});

exports.update = catchAsync(async (req, res) => {
  const company = await companyService.update(req.params.id, req.body);
  if (!company) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Company Not Found' });
  }
  res.status(HttpStatus.OK).json(company);
});

exports.remove= catchAsync(async (req, res) => {
  const company = await companyService.delete(req.params.id);
  if (!company) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'Company Not Found' });
  }
  res.status(HttpStatus.OK).json({ message: 'Company deleted successfully', company });
});
