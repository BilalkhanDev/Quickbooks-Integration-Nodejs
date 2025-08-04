const fleetService = require('../../services/fleetStatusService');
const createStatus = async (req, res) => {
  try {
    const status = await fleetService.createStatus(req.body);
    res.status(201).json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await fleetService.getStatuses();
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStatusById = async (req, res) => {
  try {
    const status = await fleetService.getStatus(req.params.id);
    if (!status) return res.status(404).json({ message: 'Not found' });
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const updated = await fleetService.updateStatus(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const removeStatusById = async (req, res) => {
  try {
    await fleetService.deleteStatus(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Bulk delete
const bulkRemoveStatus = async (req, res) => {
  try {
    const ids = req.body; // since body is just an array, not { ids: [...] }

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No IDs provided for deletion.' });
    }

    const result = await fleetService.bulkDeleteStatuses(ids);
    res.json({ message: `${result.deletedCount} statuses deleted.` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



module.exports = {
  createStatus,
  getAllStatuses,
  getStatusById,
  updateStatus,
  removeStatusById,
  bulkRemoveStatus

};