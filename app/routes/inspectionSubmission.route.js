const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth.middleware');
const inspectionSubmissionController=require('../controllers/inspectionSubmission.controller')
const parseMultipartJsonFields = require("../middleware/parseJsonFields.middleware");
const s3AssetUploader = require('../middleware/multer.middleware');
const validate = require('../middleware/validate.middleware');
const inspectionSubmissionSchema = require('../validation/inspectionSubmission.schema');

router.get('/all', useAuth,inspectionSubmissionController.getAll);

router.post('/',
     useAuth,
     s3AssetUploader("inspection"),
     validate(inspectionSubmissionSchema.create()),
     inspectionSubmissionController.createOrUpdate);

router.get('/single',useAuth,inspectionSubmissionController.getSingle);
router.get('/aggregated/:id',
     useAuth,
     inspectionSubmissionController.getAggregatedFormForFleet);

router.get('/:id',
     useAuth,
     validate(inspectionSubmissionSchema.getById()),
     inspectionSubmissionController.getById);

// Get aggregated form (template + values) for a fleet




module.exports = router;


