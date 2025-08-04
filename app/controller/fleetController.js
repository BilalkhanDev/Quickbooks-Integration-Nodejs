const fleetService = require('../services/fleetService');
const { default: HttpStatus } = require('http-status');
const pick = require('../utils/pick');

const create = async (req, res) => {
  try {
    const fleet = await fleetService.create(req);
    res.status(HttpStatus.CREATED).json(fleet);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const userId = req.user.id
    const queryParams = pick(req.query, ['search', 'status', 'type', 'group','assigned']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const fleets = await fleetService.getAll(queryParams, options, userId);
    res.status(HttpStatus.OK).json(fleets);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const getFleetSpec = async (req, res) => {
  try {
    const fleets = await fleetService.getFleetSpec(req);
    res.status(HttpStatus.OK).json(fleets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getById = async (req, res) => {
  try {
    const fleet = await fleetService.getById(req.params.id);
    if (!fleet) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Fleet not found' });
    res.status(HttpStatus.OK).json(fleet);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const fleet = await fleetService.updateById(req.params.id, req.body);
    if (!fleet) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Fleet not found' });
    res.status(HttpStatus.OK).json(fleet);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const deleted = await fleetService.deleteById(req.params.id);
    if (!deleted) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Fleet not found' });
    res.status(HttpStatus.OK).json({ message: 'Fleet deleted successfully' });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  getFleetSpec
};
