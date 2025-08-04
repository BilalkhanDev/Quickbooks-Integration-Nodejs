const { default: HttpStatus } = require('http-status');
const losService=require("../../services/common/los.service");
const pick = require('../../../shared/core/utils/pick');

exports.create = async (req, res) => {
  try {
    const los = await losService.create(req);
    res.status(HttpStatus.CREATED).send(los);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const spaceType = await losService.getSingle(req.params.id);
    if (!spaceType) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'SpaceType not found' });
    }
    res.send(spaceType);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const queryParams = pick(req.query, ['search', 'role', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await losService.getAll(queryParams, options);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await losService.update(req);
    res.send(result);
  } catch (error) {
    
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await losService.remove(req.params.id);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
