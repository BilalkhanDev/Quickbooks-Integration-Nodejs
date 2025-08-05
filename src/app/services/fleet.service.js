const { Fleet } = require("../models");
class FleetService {
  async create(req) {
    const { user, body } = req;
    const fleet = new Fleet({ user: user?.id, ...body });
    return await fleet.save();
  }

  async getAll(queryParams, options, userId) {
    const { search, assigned, ...filter } = queryParams;
    const searchFilter = await Fleet.search({ search });

    if (assigned === 'true') {
      filter.assigned_driver = { $ne: null };
    } else if (assigned === 'false') {
      filter.assigned_driver = null;
    }

    let finalFilter = { user: userId };

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      finalFilter = { $and: [{ user: userId }, filter, searchFilter] };
    } else if (Object.keys(filter).length > 0) {
      finalFilter = { $and: [{ user: userId }, filter] };
    }

    return await Fleet.paginate(finalFilter, options);
  }

  async getById(id) {
    return await Fleet.findById(id);
  }

  async update(id, data) {
    return await Fleet.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Fleet.findByIdAndDelete(id);
  }

  async getFleetSpec(req) {
    return await Fleet.find({ user: req.user.id }).select('name type group');
  }
}

module.exports = new FleetService();
