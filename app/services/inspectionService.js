const { getAllInspections, updateInspectionById, getInspectionById, createInspection } = require('../dal/inspectionDal');

const getAllInspectionService = async () => {
    try {
        return await getAllInspections();
    } catch (error) {
        throw error;
    }
};

const updateInspectionService = async (inspectionId, updateData) => {
    try {
        return await updateInspectionById(inspectionId, updateData);
    } catch (error) {
        throw error;
    }
};

const getInspectionByIdService = async (inspectionId) => {
    try {
        return await getInspectionById(inspectionId);
    } catch (error) {
        throw error;
    }
};

const createInspectionService = async (inspectionData) => {
    try {
        return await createInspection(inspectionData);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllInspectionService,
    updateInspectionService,
    getInspectionByIdService,
    createInspectionService
}; 