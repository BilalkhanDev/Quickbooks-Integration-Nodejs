const { createOrUpdateService, getSubmissionByInspectionAndFleetService, getAllSubmissionsByFleetIdService, getByIdService } = require('../services/inspectionSubmissionService');
const { getInspectionByIdService } = require('../services/inspectionService');

// Create or update a submission
const createOrUpdateSubmission = async (req, res) => {
    
  try {
    const submission = await createOrUpdateService(req);
    res.status(200).json({ success: true, data: submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get a submission by inspectionId and fleetId
const getSubmissionByInspectionAndFleet = async (req, res) => {
    try {
        const { inspectionId, fleetId } = req.query;
        const submission = await getSubmissionByInspectionAndFleetService(inspectionId, fleetId);
        res.status(200).json({ success: true, data: submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Aggregated API: Get template merged with submission values for a fleet
const getAggregatedFormForFleet = async (req, res) => {
    try {
        const { inspectionId, fleetId } = req.query;
        const template = await getInspectionByIdService(inspectionId);
        const submission = await getSubmissionByInspectionAndFleetService(inspectionId, fleetId);
        const valuesMap = {};
        if (submission?.itemValues) {
            for (const val of submission.itemValues) {
                valuesMap[val.itemId] = val.value;
            }
        }
        const itemsWithValues = template.items.map(item => ({
            ...item,
            value: valuesMap[item.itemId] ?? ""
        }));
        res.status(200).json({
            success: true,
            data: {
                _id: submission?._id ?? null,
                name: template.name,
                description: template.description,
                fleetId: submission?.fleetId ?? null,
                inspectedBy: submission?.inspectedBy ?? { email: null, name: null },
                inspectionDate: submission?.inspectionDate ?? null,
                sections: template.sections,
                items: itemsWithValues
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all submissions for a fleet, aggregated with template details
const getAllAggregatedFormsForFleet = async (req, res) => {
    try {
        const { fleetId } = req.query;
      
        const submissions = await getAllSubmissionsByFleetIdService(fleetId);
        // Aggregate: merge template (inspectionId) and itemValues for each submission
        const aggregated = submissions.map(sub => {
            const template = sub.inspectionId;
            const valuesMap = {};
            if (sub.itemValues) {
                for (const val of sub.itemValues) {
                    valuesMap[val.itemId] = val.value;
                }
            }
            const itemsWithValues = template.items.map(item => ({
                ...item,
                value: valuesMap[item.itemId] ?? ""
            }));
            return {
                _id: sub._id,
                name: template.name,
                inspectionFormId:template._id,
                description: template.description,
                fleetId: sub.fleetId,
                inspectedBy: sub.inspectedBy,
                inspectionDate: sub.inspectionDate,
                sections: template.sections,
                items: itemsWithValues,
                status: sub.status
            };
        });
        res.status(200).json({ success: true, data: aggregated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const submission = await getByIdService(id);
        res.status(200).json({ success: true, data: submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = {
    createOrUpdateSubmission,
    getSubmissionByInspectionAndFleet,
    getAggregatedFormForFleet,
    getAllAggregatedFormsForFleet,
    getById
}; 