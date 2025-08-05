const { default: HttpStatus } = require('http-status');
const  serviceAreaService  = require('../../services/common/serviceArea.service');
const pick = require('../../../shared/core/utils/pick');


exports.create = async (req, res) => {
  try {
    const result = await serviceAreaService.create(req.body);
    res.status(HttpStatus.CREATED).send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const result = await serviceAreaService.getById(req.params.id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'ServiceArea not found' });
    }
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const queryParams = pick(req.query, ['search', 'role', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await serviceAreaService.getAll(queryParams, options);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await serviceAreaService.update(req.params.id, req.body);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await serviceAreaService.delete(req.params.id);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
