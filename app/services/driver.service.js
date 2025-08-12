const { Driver } = require("../models");

class DriverService {
  async getAll(queryParams, options, userId) {
    const { search, assigned, ...filter } = queryParams;
    const searchFilter = await Driver.search({ search });

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

    return await Driver.paginate(finalFilter, options);
  }

  async getById(id) {
    return await Driver.findById(id);
  }

  async getByFleetId(fleetId) {
    return await Driver.find({ fleet: fleetId });
  }

  async create(data, userId) {
    const existingDriver = await Driver.findOne({ email: data?.email, user: userId });
    if (existingDriver) {
      throw new Error('A driver with this email already exists.');
    }

    return await Driver.create({ ...data, user: userId });
  }

  async update(id, data) {
    return await Driver.findByIdAndUpdate(id, data, { new: true });
  }
}

module.exports = new DriverService();
