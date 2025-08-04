const service = require('../../services/fuelTypeService');


const create = async (req, res) => {
  try {
    const fuelType = await service.createFuelType(value);
    res.status(201).json(fuelType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await service.getAllFuelTypes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
 

    const updated = await service.updateFuelType(id, value);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await service.deleteFuelType(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const bulkDelete = async (req, res) => {
  try {
    await service.bulkDeleteFuelTypes(value);
    res.json({ message: 'Bulk delete successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={
    create,
    update,
    remove,
    bulkDelete,
    getAll
}