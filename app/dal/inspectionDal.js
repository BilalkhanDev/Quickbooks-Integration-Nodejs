const Inspection = require('../models/inspection/Inspection');

const getAllInspections = async () => {
    try {
        return await Inspection.find().lean();
    } catch (error) {
        throw error;
    }
};
const getNameDal = async () => {
    try {
        return await Inspection.find({}, { name: 1 }).lean();
    } catch (error) {
        throw error;
    }
};
const updateInspectionById = async (inspectionId, updateData) => {
    try {
        return await Inspection.findByIdAndUpdate(
            inspectionId,
            { $set: updateData },
            { new: true }
        ).lean();
    } catch (error) {
        throw error;
    }
};

const getInspectionById = async (inspectionId) => {
    try {
        return await Inspection.findById(inspectionId).lean();
    } catch (error) {
        throw error;
    }
};

const createInspection = async (inspectionData) => {
    try {
        const inspection = new Inspection(inspectionData);
        return await inspection.save();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllInspections,
    updateInspectionById,
    getInspectionById,
    createInspection,
    getNameDal
}; 