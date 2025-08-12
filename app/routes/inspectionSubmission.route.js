const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth.middleware');
const reqValidator = require('../middleware/validate.middleware');
const inspectionSubmissionController=require('../controllers/inspectionSubmission.controller')
const parseMultipartJsonFields = require("../middleware/parseJsonFields.middleware");
const s3AssetUploader = require('../middleware/multer.middleware');
const getInspectionSubmissionSchema = require('../validation/inspectionSubmission.schema');

router.get('/all', useAuth,inspectionSubmissionController.getAll);

router.post('/',
     useAuth,
     s3AssetUploader("inspection"),
     parseMultipartJsonFields({
          inspectedBy: 'json',
          itemValues:'json',
     }),
     reqValidator(getInspectionSubmissionSchema,'create'),
     inspectionSubmissionController.createOrUpdate);

router.get('/single',
     useAuth,
     
    inspectionSubmissionController.getSingle);


router.get('/:id',
     useAuth,
  
    inspectionSubmissionController.getById);

// Get aggregated form (template + values) for a fleet
router.get('/aggregated',
     useAuth,
    
     inspectionSubmissionController.getAggregatedFormForFleet);



module.exports = router;


