const service = require('../services/vendorService');

const create = async (req, res) => {

  try {
    const vendor = await service.createVendor(req.body);
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const paginatedData = await service.getVendors(req.query);
    res.json(paginatedData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const update = async (req, res) => {
  try {
    const vendor = await service.updateVendor(req.params.id, req.body);
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await service.deleteVendor(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const bulkDelete = async (req, res) => {
   const ids = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No IDs provided for deletion.' });
    }


  try {
    await service.bulkDeleteVendors(ids);
    res.json({ message: 'Bulk delete successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports={
    create,
    update,
    remove,
    getAll,
    bulkDelete
}