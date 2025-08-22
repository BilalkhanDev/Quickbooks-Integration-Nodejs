// services/serviceEntry.service.js
const mongoose = require('mongoose');
const { default: HttpStatus } = require('http-status');
const { ServiceEntry, ServiceTask } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const GenericService = require('./generic.service');

class ServiceEntryService extends GenericService {
  constructor() {
    super(ServiceEntry);
  }

  async create(data) {
    // Loop through line items and populate maintanceCategories if needed
    for (let li of data.lineItems) {
      const serviceTask = await ServiceTask.findById(li.serviceTask); // Correctly using ObjectId for lookup
      if (serviceTask && !li.maintanceCategories) {
        li.maintanceCategories = serviceTask.maintanceCategories; // Populating maintanceCategories from the ServiceTask
      }
    }

    const document = new this.model(data);
    return await document.save();
  }

  // Update Service Entry - Ensure maintanceCategories is populated if not already set
  async update(id,updatedData) {

    // Perform update
    const updated = await this.model.findOneAndUpdate(
      { _id: id},
      updatedData,
      { new: true }
    );

    if (!updated) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Service entry not found or unauthorized');
    }

    return updated;
  }
  async getByFleetId(queryParams, options, userId, fleetId) {
    if (!fleetId || !mongoose.Types.ObjectId.isValid(fleetId)) {
      throw new ApiError(HttpStatus.BAD_REQUEST,'Invalid Fleet ID');
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(HttpStatus.BAD_REQUEST,'Invalid User ID');
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
  async getById(id) {
    const entry = await ServiceEntry.findOne({ _id: id })
      .populate('vendor', '_id name')
      .populate('issues', '-fleetId')
      .populate({
        path: 'lineItems', 
        select: 'serviceTask maintanceCategories', 
        populate: [
          {
            path: 'serviceTask', 
            select: 'title', 
            populate: {
              path: 'maintanceCategories', 
              select: 'categoryCode systemCode assemblyCode reasonToRepair', 
              populate: [
                {
                  path: 'categoryCode',
                  model: 'CategoryCode', 
                  select: 'title description', 
                },
                {
                  path: 'systemCode',
                  model: 'SystemCode',
                  select: 'code description', 
                },
                {
                  path: 'assemblyCode',
                  model: 'AssemblyCode', 
                  select: 'code description', 
                },
                {
                  path: 'reasonToRepair',
                  model: 'ReasonCode', 
                  select: 'reason description',
                }
              ]
            }
          }
        ]
      })
      .exec();


    if (!entry) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Service entry not found or unauthorized');
    }

    return entry;
  }

}

module.exports = new ServiceEntryService();
