// services/serviceEntry.service.js
const mongoose = require('mongoose');
const { ServiceEntry } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const GenericService = require('./generic.service');

class ServiceEntryService extends GenericService {
  constructor() {
    super(ServiceEntry);
  }


  async getByFleetId(queryParams, options, userId, fleetId) {
    if (!fleetId || !mongoose.Types.ObjectId.isValid(fleetId)) {
      throw new ApiError('Invalid Fleet ID');
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError('Invalid User ID');
    }

    const { search, ...filter } = queryParams;

    const searchFilter = await this.model.search?.({ search }); // Optional static method
    let finalFilter = {
      fleet: new mongoose.Types.ObjectId(fleetId),
      user: new mongoose.Types.ObjectId(userId),
    };

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      finalFilter = {
        $and: [
          { fleet: new mongoose.Types.ObjectId(fleetId) },
          { user: new mongoose.Types.ObjectId(userId) },
          filter,
          searchFilter,
        ],
      };
    } else if (Object.keys(filter).length > 0) {
      finalFilter = {
        $and: [
          { fleet: new mongoose.Types.ObjectId(fleetId) },
          { user: new mongoose.Types.ObjectId(userId) },
          filter,
        ],
      };
    }

    const result = await this.model.paginate(finalFilter, {
      ...options,
      populate: 'issuesCount vendor',
    });

    return result;
  }

  async getById(id, userId) {
    const entry = await this.model.findOne({
      _id: id,
      user: userId,
    })
      .populate('vendor', '_id name')
      .populate('issues', '-fleetId');

    if (!entry) {
      throw new ApiError('Service entry not found or unauthorized');
    }

    return entry;
  }
// here' we override the generic servive update to add custom 
  async update(req) {
    const { id } = req.params;
    const user = req.user.id;

    const updated = await this.model.findOneAndUpdate(
      { _id: id, user },
      { ...req.body },
      { new: true }
    );

    if (!updated) {
      throw new ApiError('Service entry not found or unauthorized');
    }

    return updated;
  }
}

module.exports = new ServiceEntryService();
