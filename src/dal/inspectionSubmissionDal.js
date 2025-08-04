const InspectionSubmission = require('../app/models/inspection/inspectionSubmission.model');
const Inspection = require('../app/models/inspection/inspection.model');

const createOrUpdateDal = async (inspectionId, fleetId, submissionData) => {
  const inspectionExists = await Inspection.exists({ _id: inspectionId });
  if (!inspectionExists) {
    throw new Error('Invalid inspectionId: not found in system');
  }
 console.log("Inspection Id", inspectionId)
  try {
    return await InspectionSubmission.findOneAndUpdate(
      { inspectionId, fleetId },
      { $set: submissionData },
      { upsert: true, new: true }
    ).lean();
  } catch (error) {
    throw error;
  }
};
const getSubmissionByInspectionAndFleet = async (inspectionId, fleetId) => {
    try {
        return await InspectionSubmission.findOne({ inspectionId, fleetId }).lean();
    } catch (error) {
        throw error;
    }
};

const getByIdDal= async (id) => {
    try {
        return await InspectionSubmission.findById(id).lean();
    } catch (error) {
        throw error;
    }
};
const getAllSubmissionsByFleetId = async (fleetId) => {
    try {
        return await InspectionSubmission.find({ fleetId })
            .populate('inspectionId')
            .lean();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createOrUpdateDal,
    getSubmissionByInspectionAndFleet,
    getAllSubmissionsByFleetId,
    getByIdDal
}; 