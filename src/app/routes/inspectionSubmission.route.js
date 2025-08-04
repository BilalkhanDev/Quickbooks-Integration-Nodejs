const express = require('express');
const router = express.Router();
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { createOrUpdateSubmission, getSubmissionByInspectionAndFleet, getAggregatedFormForFleet, getAllAggregatedFormsForFleet, getById } = require('../controllers/inspectionSubmission.controller');
const parseMultipartJsonFields = require("../../shared/middleware/parseJsonFields.middleware");
const s3AssetUploader = require('../../shared/middleware/multer.middleware');

// Get all aggregated forms for a fleet
router.get('/all', useAuth, getAllAggregatedFormsForFleet);
// Create or update a submission
router.post('/',
     useAuth,
     s3AssetUploader("inspection"),
     parseMultipartJsonFields({
          inspectedBy: 'json',
          itemValues:'json',
     }),
     reqValidator('inspectionSubmissionSchema', 'body'),
     createOrUpdateSubmission);

// Get a submission by inspectionId and fleetId
router.get('/single',
     useAuth,
     reqValidator('getInspectionSubmissionSchema', 'query'),
     getSubmissionByInspectionAndFleet);
// get single by id itself

router.get('/:id',
     useAuth,
     reqValidator('generiIdSchema', 'params'),
     getById);

// Get aggregated form (template + values) for a fleet
router.get('/aggregated',
     useAuth,
     reqValidator('getInspectionSubmissionSchema', 'query'),
     getAggregatedFormForFleet);



module.exports = router;


