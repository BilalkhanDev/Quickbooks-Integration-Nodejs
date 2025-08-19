const { Driver } = require("../models");
const GenericService = require("./generic.service");
const ApiError = require("../shared/core/exceptions/ApiError"); // Optional, for consistent error handling
const { default: HttpStatus } = require('http-status');

class DriverService extends GenericService {
  constructor() {
    super(Driver);
  }

  async getAll(queryParams, options, userId) {
    const { search, assigned, ...filter } = queryParams;
    const searchFilter = await this.model.search({ search });

    if (assigned === 'true') {
      filter.fleet = { $ne: null };
    } else if (assigned === 'false') {
      filter.fleet = null;
    }

    let finalFilter = { user: userId };

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      finalFilter = { $and: [{ user: userId }, filter, searchFilter] };
    } else if (Object.keys(filter).length > 0) {
      finalFilter = { $and: [{ user: userId }, filter] };
    }

    return this.model.paginate(finalFilter, options);
  }

  async getByFleetId(fleetId) {
    return this.model.find({ fleet: fleetId });
  }

  async create(data, userId) {
    const existingDriver = await this.model.findOne({ email: data?.email, user: userId });
    if (existingDriver) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'A driver with this email already exists.');
    }
    return this.model.create({ ...data, user: userId });
  }
}

module.exports = new DriverService();
