// services/inspectionSubmission.service.js
const { Inspection, InspectionSubmission } = require('../models')

class InspectionSubmissionService {
  async createOrUpdate(req) {
    const { inspectionId, fleetId, inspectedBy, inspectionDate, itemValues, status } = req.body;
    const uploads = req.s3Grouped || {};

    if (!inspectionId || !fleetId) {
      throw new Error("Missing required fields: inspectionId or fleetId");
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
      inspectedBy,
      inspectionDate,
      itemValues: enrichedItemValues,
      status,
    };

    return await InspectionSubmission.findOneAndUpdate(
      { inspectionId, fleetId },
      { $set: submissionData },
      { upsert: true, new: true }
    ).lean();
  }

  async getByInspectionAndFleet(inspectionId, fleetId) {
    return await InspectionSubmission.findOne({ inspectionId, fleetId }).lean();
  }

  async getAllByFleetId(fleetId) {
    return await InspectionSubmission.find({ fleetId }).populate('inspectionId').lean();
  }

  async getById(id) {
    return await InspectionSubmission.findById(id).lean();
  }
}

module.exports = new InspectionSubmissionService();
