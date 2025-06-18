const InspectionSubmission = require('../models/inspection/InspectionSubmission');
const Inspection = require('../models/inspection/Inspection');
const { safeRedisGet } = require('../utils/redis');

const createOrUpdateSubmission = async (inspectionId, fleetId, submissionData) => {
    // Check Redis for cached Fleet IDs
    const redisKey = 'fleets:all';
    const cachedFleetIds = await safeRedisGet(redisKey);
    if (cachedFleetIds) {
        const storedFleetIds = JSON.parse(cachedFleetIds);
        if (!storedFleetIds.includes(fleetId)) {
            throw new Error('Invalid fleetId: not found in system');
        }
    }
    // Check if inspectionId exists in Inspection model
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