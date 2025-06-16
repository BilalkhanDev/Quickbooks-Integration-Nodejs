const fleetService = require('../services/fleetService');

const createFleetController = async (req, res) => {
  try {
    const fleet = await fleetService.createFleet(req.body);
    res.status(201).json(fleet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFleetsController = async (req, res) => {
  try {
    const fleets = await fleetService.getAllFleets(req);
    res.status(200).json(fleets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFleetSpecController = async (req, res) => {
  try {
    const fleets = await fleetService.getFleetSpec(req);
    res.status(200).json(fleets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getFleetByIdController = async (req, res) => {
  try {
    const fleet = await fleetService.getFleetById(req.params.id);
    if (!fleet) return res.status(404).json({ message: 'Fleet not found' });
    res.status(200).json(fleet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFleetController = async (req, res) => {
  try {
    const fleet = await fleetService.updateFleet(req.params.id, req.body);
    if (!fleet) return res.status(404).json({ message: 'Fleet not found' });
    res.status(200).json(fleet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFleetController = async (req, res) => {
  try {
    const deleted = await fleetService.deleteFleet(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Fleet not found' });
    res.status(200).json({ message: 'Fleet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createFleetController,
  getAllFleetsController,
  getFleetByIdController,
  updateFleetController,
  deleteFleetController,
  getFleetSpecController
};
