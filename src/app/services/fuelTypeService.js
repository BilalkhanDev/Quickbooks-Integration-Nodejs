const fuelTypeDal = require('../dal/fuelTypeDal');

const createFuelType = async (data) => fuelTypeDal.create(data);
const getAllFuelTypes = async () => fuelTypeDal.findAll();
const updateFuelType = async (id, data) => fuelTypeDal.updateById(id, data);
const deleteFuelType = async (id) => fuelTypeDal.deleteById(id);
const bulkDeleteFuelTypes = async (ids) => fuelTypeDal.bulkDelete(ids);

module.exports = { createFuelType, getAllFuelTypes, updateFuelType, deleteFuelType, bulkDeleteFuelTypes };