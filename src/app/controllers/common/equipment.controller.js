const { default: HttpStatus } = require('http-status');
const  equipmentService  = require('../../services/common/equipment.service');
const pick = require('../../utils/pick');

exports.create = async (req, res) => {
  try {
    const result = await equipmentService.create(req.body);
    res.status(HttpStatus.CREATED).send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const result = await equipmentService.getSingle(req.params.id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'Addon not found' });
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
    const result = await equipmentService.getAll(queryParams, options);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await equipmentService.update(req.params.id, req.body);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await equipmentService.remove(req.params.id);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
