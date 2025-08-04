const Company = require("../models/company.model");


const create= async (data) => {
  const company = new Company(data);
  return await company.save();
};

const getAll = async () => {
  return await Company.find();
};

const getById = async (id) => {
  return await Company.findById(id);
};

const update= async (id, data) => {
  return await Company.findByIdAndUpdate(id, data, { new: true });
};

const deleteById= async (id) => {
  return await Company.findByIdAndDelete(id);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById
};
