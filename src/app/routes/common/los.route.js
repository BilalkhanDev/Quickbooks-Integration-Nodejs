const express = require('express');
const reqValidator = require('../../middleware/validate.middleware');
const router = express.Router();
const losController=require("../../controllers/common/los.controller")
const { useAuth } = require('../../middleware/useAuth.middleware');
const s3AssetUploader = require('../../middleware/multer.middleware');
const getLOSValidationSchema = require('../../validation/common/los.schema');

router
  .route('/')
  .post(useAuth, s3AssetUploader("common/los", "profileImage"),reqValidator(getLOSValidationSchema,'create'),losController.create )
  .get(useAuth, losController.getAll);

router
  .route('/:id')
  .get(useAuth,reqValidator(getLOSValidationSchema,'getById'),losController.getSingle)
  .patch(useAuth,s3AssetUploader("common/los", "profileImage"),reqValidator(getLOSValidationSchema,'update'),losController.update)
  .delete(useAuth,reqValidator(getLOSValidationSchema,'getById'),losController.remove);

module.exports = router;
