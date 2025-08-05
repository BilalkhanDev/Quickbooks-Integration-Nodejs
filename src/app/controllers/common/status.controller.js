const { default: HttpStatus } = require('http-status');
const catchAsync = require('../../../shared/core/utils/catchAsync');
const fleetStatusService = require('../../services/common/fleetStatus.service');

exports.create = catchAsync(async (req, res) => {

  const status = await fleetStatusService.create(req.body);
  res.status(HttpStatus.CREATED).json(status);

});

exports.getAll = async (req, res) => {

  const statuses = await fleetStatusService.getAll();
  res.status(HttpStatus.OK).json(statuses);

};

exports.getById = async (req, res) => {

  const status = await fleetStatusService.getById(req.params.id);
  if (!status) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Not found' });
  res.status(HttpStatus.OK).json(status);

};

exports.update = async (req, res) => {

  const updated = await fleetStatusService.update(req.params.id, req.body);
  res.status(HttpStatus.OK).json(updated);

};

exports.remove = async (req, res) => {

  await fleetStatusService.delete(req.params.id);
  res.status(HttpStatus.OK).json({ message: 'Deleted' });

};


exports.bulkRemove = async (req, res) => {

  const ids = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(HttpStatus.NOT_FOUND).json({ error: 'No IDs provided for deletion.' });
  }

  const result = await fleetStatusService.bulkDelete(ids);
  res.json({ message: `${result.deletedCount} statuses deleted.` });

};



