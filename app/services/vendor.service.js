const ApiError = require("../shared/core/exceptions/ApiError");
const { Vendor } = require("../models");
const GenericService = require("./generic.service");
const HttpStatus = require('http-status').default;
class VendorService extends GenericService {
  constructor() {
    super(Vendor);
  }
    async create(req) {
    const { body } = req;
    const name = body?.name?.trim();

    if (!name) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Name is required');
    }

    const isDuplicate = await this.model.isTitleTaken(name);
    console.log(isDuplicate)
    if (isDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST,'Name already taken');
    }

    const payload = {
      ...body,
      name,
    };

    return this.model.create(payload);
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
    async update(id, updateBody) {
      const equipment = await this.model.findById(id);
      if (updateBody.name && await this.model.isTitleTaken(updateBody.name, id)) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
      }
  
      Object.assign(equipment, updateBody);
      await equipment.save();
      return equipment;
    }
}

module.exports = new VendorService();
