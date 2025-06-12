const FuelType = require('../models/fuelTypes');

const create = (data) => FuelType.create(data);
const findAll = () => FuelType.find();
const findById = (id) => FuelType.findById(id);
const updateById = (id, data) => FuelType.findByIdAndUpdate(id, data, { new: true });
const deleteById = (id) => FuelType.findByIdAndDelete(id);
const bulkDelete = (ids) => FuelType.deleteMany({ _id: { $in: ids } });

module.exports = { create, findAll, findById, updateById, deleteById, bulkDelete };