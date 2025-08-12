// services/inspectionSubmission.service.js
const { Inspection, InspectionSubmission } = require('../models')

class InspectionSubmissionService {
  async createOrUpdate(req) {
    const userId = req.user.id
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
      user: userId,
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

  async getByInspectionAndFleet(fleetId, userId) {
    console.log(fleetId)
    return await InspectionSubmission.findOne({ fleet: fleetId, user: userId }).lean();
  }

  async getAllByFleetId(fleetId, userId) {
    const data = await InspectionSubmission.find({ fleet: fleetId, user: userId }).populate('inspectionId', '_id name').lean();
    return data
  }

 async getById(id) {
  const data = await InspectionSubmission.findById(id)
    .populate({
      path: 'inspectionId',
      select: '_id name description sections items',
    })
    .lean();

  // Ensure data and inspectionId exist
  if (data && data.inspectionId) {
    // Loop over each item in the inspection template
    data.inspectionId.items.forEach(item => {
      // Find the corresponding item value from the submission (itemValues)
      const itemValue = data.itemValues.find(iv => iv.itemId === item.itemId);
      
      // If itemValue exists, update the item value
      if (itemValue) {
        item.value = itemValue.value; // Append the value to the item
      }

      // Add the section info by matching the sectionId if section exists
      const section = data.inspectionId.sections.find(s => s.sectionId === item.sectionId);
      if (section) {
        item.section = section; // Append the section data to the item
      }
    });

    delete data?.itemValues; 
  }

  return data
}


}

module.exports = new InspectionSubmissionService();
