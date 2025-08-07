const ApiError = require("../shared/core/exceptions/ApiError");
const { ServiceEntry } = require("../models");
const mongoose = require("mongoose")
class ServiceEntryService {
  async create(req) {
    const documentUrls = req?.s3Urls || [];
    const user = req.user.id;

    const newEntry = await ServiceEntry.create({
      ...req.body,
      user,
      documents: documentUrls,
    });

    return newEntry;
  }

  async getByFleetId(queryParams, options, userId, fleetId) {
    if (!fleetId || !mongoose.Types.ObjectId.isValid(fleetId)) {
      throw new ApiError('Invalid Fleet ID');
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError('Invalid User ID');
    }
    const { search, ...filter } = queryParams;
    const searchFilter = await ServiceEntry.search({ search });
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

    const result = await ServiceEntry.paginate(finalFilter, {
      ...options,
      populate: 'issuesCount vendor', // Populate 'issues' and 'vendor'
    });

    return result;
  }

  async getById(id, userId) {
    console.log("Id", id, userId)
    const entry = await ServiceEntry.findOne({
      _id: id,
      user: userId,
    })
      .populate('vendor', '_id, name')
      .populate('issues', '-fleetId');

    if (!entry) throw new ApiError('Service entry not found or unauthorized');
    return entry;
  }

  async update(req) {
    const { id } = req.params;
    const user = req.user.id;
    const { existingDocuments } = req.body;

    let existingDocsArray = [];
    if (existingDocuments) {
      try {
        existingDocsArray = JSON.parse(existingDocuments);
      } catch (err) {
        console.warn('Invalid JSON in existingDocuments');
      }
    }

    const uploadedDocs = req?.s3Urls || [];
    const finalDocuments = [...existingDocsArray, ...uploadedDocs];

    const updated = await ServiceEntry.findOneAndUpdate(
      { _id: id, user },
      { ...req.body, documents: finalDocuments },
      { new: true }
    );

    if (!updated) throw new ApiError('Service entry not found or unauthorized');
    return updated;
  }
}

module.exports = new ServiceEntryService();
