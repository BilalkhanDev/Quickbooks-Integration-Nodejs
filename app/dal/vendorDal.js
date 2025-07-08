const Vendor = require('../models/vendor');

const create = (data) => Vendor.create(data);

const findAll = async (filters = {}, { page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Vendor.find(filters)?.skip(skip)?.limit(limit),
    Vendor.countDocuments(filters)
  ]);

  return {
    data,
    total,
    page,
    pages: Math.ceil(total / limit)
  };
};
const findById = (id) => Vendor.findById(id);
const updateById = (id, data) => Vendor.findByIdAndUpdate(id, data, { new: true });
const deleteById = (id) => Vendor.findByIdAndDelete(id);
const bulkDelete = (ids) => Vendor.deleteMany({ _id: { $in: ids } });

module.exports = { create, findAll, findById, updateById, deleteById, bulkDelete };
