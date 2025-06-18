const { createOrUpdateSubmission, getSubmissionByInspectionAndFleet, getAllSubmissionsByFleetId } = require('../dal/inspectionSubmissionDal');

const createOrUpdateSubmissionService = async (inspectionId, fleetId, submissionData) => {
    try {
        return await createOrUpdateSubmission(inspectionId, fleetId, submissionData);
    } catch (error) {
        throw error;
    }
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

module.exports = {
    createOrUpdateSubmissionService,
    getSubmissionByInspectionAndFleetService,
    getAllSubmissionsByFleetIdService
}; 