const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth');
const reqValidator = require('../middleware/reqValidator');
const { createOrUpdateSubmission, getSubmissionByInspectionAndFleet, getAggregatedFormForFleet, getAllAggregatedFormsForFleet } = require('../controller/inspectionSubmissionController');

// Create or update a submission
router.post('/',
    useAuth,
    reqValidator('inspectionSubmissionSchema', 'body'), createOrUpdateSubmission);

// Get a submission by inspectionId and fleetId
router.get('/single',
     useAuth,
     reqValidator('getInspectionSubmissionSchema', 'query'), 
      getSubmissionByInspectionAndFleet);

// Get aggregated form (template + values) for a fleet
router.get('/aggregated',
     useAuth,
     reqValidator('getInspectionSubmissionSchema', 'query'),
     getAggregatedFormForFleet);

// Get all aggregated forms for a fleet
router.get('/all-aggregated', useAuth, getAllAggregatedFormsForFleet);

module.exports = router; 