// controllers/driverController.js
const driverService = require("../services/driverService");
const pick = require("../utils/pick");
const { default: HttpStatus } = require('http-status');

const getAll = async (req, res) => {
  try {
    const userId = req.user.id
    const queryParams = pick(req.query, ['search','assigned']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const drivers = await driverService.getAll(queryParams, options, userId);
     res.status(HttpStatus.OK).json(drivers);
  
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const driver = await driverService.getById(req.params.id);
    if (!driver) return res.status(404).json({ error: "Driver not found" });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getByFleetId = async (req, res) => {
  try {
    const drivers = await driverService.getByFleetId(req.params.fleetId);
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const userId=req.user.id
    const driver = await driverService.create(req.body,userId);
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const driver = await driverService.updateById(req.params.id, req.body);
    if (!driver) return res.status(404).json({ error: "Driver not found" });
    res.json(driver);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  getByFleetId,
  create,
  update,
};
