const fleetTypeService = require('../services/typeService');

const create = async (req, res) => {
  try {
    const data = await fleetTypeService.createFleetType(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await fleetTypeService.getAllFleetTypes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await fleetTypeService.updateFleetType(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await fleetTypeService.deleteFleetType(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const bulkDelete = async (req, res) => {
  try {
    const result = await fleetTypeService.bulkDeleteFleetTypes(req.body);
    res.json({ message: `${result.deletedCount} fleet types deleted.` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  update,
  getAll,
  remove,
  bulkDelete
};
