const { create, updateById, deleteById, bulkDelete, findAll } = require("../dal/VendorDal");

const createVendor = async (data) => create(data);
const getVendors = async (query) => {
  const { page = 1, limit = 10, name, classification, labels, contactName } = query;

  const filters = {};
  if (name) filters.name = { $regex: name, $options: 'i' };
  if (classification) filters.classification = classification;
  if (contactName) filters.contactName = { $regex: contactName, $options: 'i' };
  if (labels) filters.labels = { $in: Array.isArray(labels) ? labels : [labels] };

  return await  findAll (filters, {
    page: parseInt(page),
    limit: parseInt(limit)
  });
};
const updateVendor = async (id, data) =>updateById(id, data);
const deleteVendor = async (id) => deleteById(id);
const bulkDeleteVendors = async (ids) => bulkDelete(ids);

module.exports = { createVendor, getVendors, updateVendor, deleteVendor, bulkDeleteVendors };