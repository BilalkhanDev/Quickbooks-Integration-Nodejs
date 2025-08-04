// dal/driverDal.js
const Driver = require("../app/models/driver.model");

const getAll = () => Driver.find();

const getById = (id) => Driver.findById(id);

const getByFleetId = (fleetId) =>
  Driver.find({ fleet: fleetId }).populate("fleet");

const create = (data) => Driver.create(data);

const findOne = async (filter) => {
  return await Driver.findOne(filter);
};


const updateById = (id, data) =>
  Driver.findByIdAndUpdate(id, data, { new: true });

module.exports = {
  getAll,
  getById,
  getByFleetId,
  create,
  updateById,
  findOne
};
