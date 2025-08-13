const ApiError = require("../shared/core/exceptions/ApiError");
const { Vendor } = require("../models");
const GenericService = require("./generic.service");

class VendorService extends GenericService {
  constructor() {
    super(Vendor);
  }
  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await Vendor.search({ search });
    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }
    return await Vendor.paginate(filter, options);
  }
  async bulkDelete(ids) {
    if (!Array.isArray(ids)) throw new ApiError('IDs must be an array');
    const result = await Vendor.deleteMany({ _id: { $in: ids } });
    return result;
  }
}

module.exports = new VendorService();
