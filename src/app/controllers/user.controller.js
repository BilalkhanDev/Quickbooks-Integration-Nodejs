const service = require('../services/user.service');
const catchAsync = require('../../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await service.fetchAll(req.query);
  res.status(HttpStatus.OK).json({ message: 'Users fetched', users });
});

exports.getSingleUser = catchAsync(async (req, res) => {
  const user = await service.fetchById(req.params.id);
  res.status(HttpStatus.OK).json({ message: 'User fetched', user });
});
