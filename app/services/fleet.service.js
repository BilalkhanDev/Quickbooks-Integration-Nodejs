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

    return await Fleet.paginate(finalFilter, {
      ...options,
      populate: [
        { path: 'group', select: '_id name' },
        { path: 'type', select: '_id name' },
        { path: 'los', select: '_id title' },
        { path: 'fundingSources', select: '_id title' },
        { path: 'assigned_driver', select: '_id firstName lastName email' },
        { path: 'fuelType', select: '_id name' },
      ],
    });
  }


  async getById(id) {
    // Define the reference fields to be populated
    const refFields = [
      'user',
      'serviceAreas',
      'los',
      'spaceType',
      'type',
      'group',
      'equipments',
      'fundingSources',
      'assigned_driver',
      'fuelType'
    ];

    const populateFields = refFields.map(field => {
      return {
        path: field,
        select: '_id ' + (['assigned_driver', 'group'].includes(field) ? 'firstName lastName email' : 'title name')  // Populate `title` or `name` based on the field
      };
    });

    // Fetch and populate Fleet data
    const result = await Fleet.findById(id).populate(populateFields);

    return result;
  }


  async update(id, data) {
    console.log("Dat",data)
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
