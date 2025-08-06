// services/inspectionSubmission.service.js
const { Inspection, InspectionSubmission } = require('../models')

class InspectionSubmissionService {
  async createOrUpdate(req) {
    const userId=req.user.id
    const { inspectionId, fleet, inspectedBy, inspectionDate, itemValues, status } = req.body;
    const uploads = req.s3Grouped || {};

    if (!inspectionId || !fleet) {
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
      user:userId,
      inspectedBy,
      inspectionDate,
      itemValues: enrichedItemValues,
      status,
    };

    return await InspectionSubmission.findOneAndUpdate(
      { inspectionId, fleet },
      { $set: submissionData },
      { upsert: true, new: true }
    ).lean();
  }

  async getByInspectionAndFleet(fleetId,userId) {
    console.log(fleetId)
    return await InspectionSubmission.findOne({ fleet:fleetId ,user:userId}).lean();
  }

  async getAllByFleetId(fleetId,userId) {
    const data = await InspectionSubmission.find({ fleet:fleetId,user:userId }).populate('inspectionId','_id name').lean();
    return data
  }

  async getById(id) {
    return await InspectionSubmission.findById(id).lean();
  }
}

module.exports = new InspectionSubmissionService();
