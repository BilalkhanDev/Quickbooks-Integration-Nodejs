const { ServiceEntry } = require("../models");



class ServiceEntryService {
  async create(req) {
    const documentUrls = req?.s3Urls || [];

    const newEntry = await ServiceEntry.create({
      ...req.body,
      documents: documentUrls,
    });

    return newEntry;
  }

  async getByFleetId(fleetId) {
    if (!fleetId) throw new Error('Fleet ID is required');

    const entries = await ServiceEntry.aggregate([
      { $match: { fleetId } },

      {
        $lookup: {
          from: 'vendors',
          localField: 'vendor',
          foreignField: '_id',
          as: 'vendorData',
        },
      },
      { $unwind: { path: '$vendorData', preserveNullAndEmptyArrays: true } },

      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'serviceId',
          as: 'issuesArray',
        },
      },
      {
        $addFields: {
          issuesCount: { $size: { $ifNull: ['$issuesArray', []] } },
        },
      },
      {
        $project: {
          repairPriorityClass: 1,
          odometer: 1,
          void: 1,
          completionDate: 1,
          isStartDate: 1,
          startDate: 1,
          reference: 1,
          labels: 1,
          photos: 1,
          documents: 1,
          comments: 1,
          createdAt: 1,
          updatedAt: 1,
          vendor: '$vendorData',
          issuesCount: 1,
        },
      },
    ]);

    return entries;
  }

  async getById(id) {
    const entry = await ServiceEntry.findById(id)
      .populate('vendor')
      .populate('issues', '-fleetId');
    return entry;
  }

  async update(req) {
    const { id } = req.params;
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

    const updated = await ServiceEntry.findByIdAndUpdate(
      id,
      { ...req.body, documents: finalDocuments },
      { new: true }
    );

    if (!updated) throw new Error('Service entry not found');
    return updated;
  }
}

module.exports = new ServiceEntryService();
