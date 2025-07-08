const InspectionSubmission = require('../models/inspection/InspectionSubmission');
const Inspection = require('../models/inspection/Inspection');


const createOrUpdateSubmission = async (inspectionId, fleetId, submissionData) => {
  
 
    const inspectionExists = await Inspection.exists({ _id: inspectionId });
    if (!inspectionExists) {
        throw new Error('Invalid inspectionId: not found in system');
    }
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
    createOrUpdateSubmission,
    getSubmissionByInspectionAndFleet,
    getAllSubmissionsByFleetId
}; 