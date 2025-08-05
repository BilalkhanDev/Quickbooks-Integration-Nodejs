const express = require('express');
const router = express.Router();
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../shared/middleware/validate.middleware');
const inspectionSubmissionController=require('../controllers/inspectionSubmission.controller')
const parseMultipartJsonFields = require("../../shared/middleware/parseJsonFields.middleware");
const s3AssetUploader = require('../../shared/middleware/multer.middleware');

router.get('/all', useAuth,inspectionSubmissionController.getAllAggregatedFormsForFleet);

router.post('/',
     useAuth,
     s3AssetUploader("inspection"),
     parseMultipartJsonFields({
          inspectedBy: 'json',
          itemValues:'json',
     }),
   
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


