const ApiError = require("../../shared/core/exceptions/ApiError");
const { Vendor } = require("../models");

class VendorService {
  async create(data) {
    const vendor = new Vendor(data);
    return await vendor.save();
  }

  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await Vendor.search({ search });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }
    const results = await Vendor.paginate(filter, options);
    return results

  }

  async getById(id) {
    const SingleVendor = await Vendor.findById(id);
    if (!SingleVendor) throw new ApiError('Vendor not found');
    return SingleVendor;
  }
  async update(id, data) {
    const updated = await Vendor.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new ApiError('Vendor not found');
    return updated;
  }

  async delete(id) {
    const deleted = await Vendor.findByIdAndDelete(id);
    if (!deleted) throw new ApiError('Vendor not found');
    return deleted;
  }

  async bulkDelete(ids) {
    if (!Array.isArray(ids)) throw new ApiError('IDs must be an array');
    const result = await Vendor.deleteMany({ _id: { $in: ids } });
    return result;
  }
}

module.exports = new VendorService();
