const { Fleet } = require("../models");
const GenericService = require("./generic.service");

class FleetService extends GenericService {
  constructor() {
    super(Fleet);
  }

  async create(req) {
    const { user, body } = req;
    const fleet = new this.model({ user: user?.id, ...body });
    return fleet.save();
  }

  async getAll(queryParams, options, userId) {
    const { search, assigned, ...filter } = queryParams;
    const searchFilter = await this.model.search({ search });

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
    return this.model.paginate(finalFilter, {
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

    const populateFields = refFields.map(field => ({
      path: field,
      select: '_id ' + (['assigned_driver', 'group'].includes(field) ? 'firstName lastName email' : 'title name')
    }));

    return this.model.findById(id).populate(populateFields);
  }

  async getFleetSpec(req) {
    return this.model.find({ user: req.user.id }).select('name type group');
  }
}

module.exports = new FleetService();
