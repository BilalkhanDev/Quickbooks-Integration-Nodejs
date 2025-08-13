// services/inspectionSubmission.service.js
const { InspectionSubmission } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const GenericService = require('./generic.service');

class InspectionSubmissionService extends GenericService {
  constructor() {
    super(InspectionSubmission);
  }

  async createOrUpdate(req) {
    const userId = req.user.id;
    const { inspectionId, fleet, inspectedBy, inspectionDate, itemValues, status } = req.body;
    const uploads = req.s3Grouped || {};

    if (!inspectionId || !fleet) {
      throw new ApiError("Missing required fields: inspectionId or fleetId");
    }

    const enrichedItemValues = (itemValues || []).map(item => {
      const itemId = String(item.itemId).trim();
      const fileUrls = uploads[itemId];

      if (fileUrls && fileUrls.length > 0) {
        return {
          ...item,
          value: fileUrls.length === 1 ? fileUrls[0] : fileUrls,
          type: "file"
        };
      }

      return item;
    });

    const submissionData = {
      user: userId,
      inspectedBy,
      inspectionDate,
      itemValues: enrichedItemValues,
      status,
    };

    return await this.model.findOneAndUpdate(
      { inspectionId, fleet },
      { $set: submissionData },
      { upsert: true, new: true }
    ).lean();
  }

  async getByInspectionAndFleet(inspectionId, fleetId, userId) {
    return await this.model.findOne({
      inspectionId,
      fleet: fleetId,
      user: userId,
    }).lean();
  }

  async getAllByFleetId(fleetId, userId) {
    return await this.model.find({ fleet: fleetId, user: userId })
      .populate('inspectionId', '_id name')
      .lean();
  }

  async getById(id) {
    const data = await this.model.findById(id)
      .populate({
        path: 'inspectionId',
        select: '_id name description sections items',
      })
      .lean();

    if (data && data.inspectionId) {
      data.inspectionId.items.forEach(item => {
        const itemValue = data.itemValues.find(iv => iv.itemId === item.itemId);
        if (itemValue) {
          item.value = itemValue.value;
        }

        const section = data.inspectionId.sections.find(s => s.sectionId === item.sectionId);
        if (section) {
          item.section = section;
        }
      });

      delete data.itemValues;
    }

    return data;
  }
}

module.exports = new InspectionSubmissionService();
