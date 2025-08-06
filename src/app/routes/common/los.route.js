const express = require('express');
const reqValidator = require('../../../shared/middleware/validate.middleware');
const router = express.Router();
const losController=require("../../controllers/common/los.controller")
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const s3AssetUploader = require('../../../shared/middleware/multer.middleware');
const getLOSValidationSchema = require('../../../shared/validation/common/los.schema');

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
