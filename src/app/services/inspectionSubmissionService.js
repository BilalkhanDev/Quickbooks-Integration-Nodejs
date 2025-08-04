const { getSubmissionByInspectionAndFleet, getAllSubmissionsByFleetId, createOrUpdateDal, getByIdDal } = require('../../dal/inspectionSubmissionDal');

const createOrUpdateService = async (req) => {
  const { inspectionId, fleetId, inspectedBy, inspectionDate, itemValues, status } = req.body;
  const uploads = req.s3Grouped || {};

  if (!inspectionId || !fleetId) {
    throw new Error("Missing required fields: inspectionId or fleetId");
  }

  console.log("Uploads:", uploads); // ✅ Should be like: { i10: ["https://..."], i23: [...] }

  // Inject uploaded file URLs into corresponding itemValues
  const enrichedItemValues = (itemValues || []).map((item) => {
    const itemId = String(item.itemId).trim(); // normalize ID
    const fileUrls = uploads[itemId];
    console.log("File", itemId, item, fileUrls)

    if (fileUrls && fileUrls.length > 0) {
      console.log(`✔ Injecting files for itemId: ${itemId}`, fileUrls);
      return {
        ...item,
        value: fileUrls.length === 1 ? fileUrls[0] : fileUrls,
        type: "file", // Optional metadata
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

  console.log("Final submissionData", submissionData);

  return await createOrUpdateDal(inspectionId, fleetId, submissionData);
};


const getSubmissionByInspectionAndFleetService = async (inspectionId, fleetId) => {
    try {
        return await getSubmissionByInspectionAndFleet(inspectionId, fleetId);
    } catch (error) {
        throw error;
    }
};

const getAllSubmissionsByFleetIdService = async (fleetId) => {
    try {
        return await getAllSubmissionsByFleetId(fleetId);
    } catch (error) {
        throw error;
    }
};
const getByIdService = async (id) => {
    try {
        return await getByIdDal(id);
    } catch (error) {
        throw error;
    }
};


module.exports = {
    createOrUpdateService,
    getSubmissionByInspectionAndFleetService,
    getAllSubmissionsByFleetIdService,
    getByIdService
}; 