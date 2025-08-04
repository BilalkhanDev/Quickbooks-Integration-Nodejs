const { default: HttpStatus } = require('http-status');
const spaceTypeService = require('../../services/common/spaceType.service');
const pick = require('../../utils/pick');

exports.create = async (req, res) => {
  try {
    const spacetype = await spaceTypeService.create(req.body);
    res.status(HttpStatus.CREATED).send(spacetype);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

exports.getSingle = async (req, res) => {
  try {
    const spaceType = await spaceTypeService.getSingle(req.params.id);
    if (!spaceType) {
      return res.status(HttpStatus.NOT_FOUND).send({ message: 'SpaceType not found' });
    }
    res.send(spaceType);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const queryParams = pick(req.query, ['search', 'role', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const refFields = { los: ['title'] };
    const result = await spaceTypeService.getAll(queryParams, options, refFields);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const result = await spaceTypeService.update(req.params.id, req.body);
    res.send(result);
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await spaceTypeService.remove(req.params.id);
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message });
  }
};
