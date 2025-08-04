const { default: HttpStatus } = require('http-status');
const fundingsourceService=require('../../services/common/fundingSource.service');
const pick = require('../../utils/pick');

exports.create = async (req, res) => {
  try {
    const result = await fundingsourceService.create(req);
    res.status(HttpStatus.CREATED).send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const result = await fundingsourceService.getSingle(req.params.id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'Fundingsource not found' });
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
    const result = await fundingsourceService.getAll(queryParams, options);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await fundingsourceService.update(req);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await fundingsourceService.delete(req.params.id);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
