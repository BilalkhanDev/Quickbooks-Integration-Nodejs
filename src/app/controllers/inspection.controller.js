const { getAllInspectionService, updateInspectionService, getInspectionByIdService, createInspectionService, getNameService } = require('../services/inspectionService');

const getAll = async (req, res) => {
    try {
        const inspections = await getAllInspectionService();
        res.status(200).json({ success: true, data: inspections });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getName = async (req, res) => {
    try {
        const inspections = await getNameService();
        res.status(200).json({ success: true, data: inspections });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateInspection = async (req, res) => {
    try {
        const inspectionId = req.params.id;
        const updateData = req.body;
        const updatedInspection = await updateInspectionService(inspectionId, updateData);
        res.status(200).json({ success: true, data: updatedInspection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getInspectionById = async (req, res) => {
    try {
        const inspectionId = req.params.id;
        const inspection = await getInspectionByIdService(inspectionId);
        res.status(200).json({ success: true, data: inspection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const createInspection = async (req, res) => {
    try {
        const inspectionData = req.body;
        const newInspection = await createInspectionService(inspectionData);
        res.status(201).json({ success: true, data: newInspection });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAll,
    updateInspection,
    getInspectionById,
    getName,
    createInspection
};