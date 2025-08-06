const express = require('express');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../../shared/middleware/validate.middleware');
const s3AssetUploader = require('../../../shared/middleware/multer.middleware');
const fsController=require('../../controllers/common/fundingSource.controller');
const getFundingSourceValidation = require('../../../shared/validation/common/fundingSource.schema');
const router = express.Router();

router
  .route('/')
  .post(useAuth,s3AssetUploader("common/fs", "profileImage"),reqValidator(getFundingSourceValidation,'create'),fsController.create)
  .get(useAuth, fsController.getAll);


router
  .route('/:id')
  .get(useAuth,reqValidator(getFundingSourceValidation,'getById'),fsController.getSingle)
  .patch(useAuth,s3AssetUploader("common/fs", "profileImage"),reqValidator(getFundingSourceValidation,'update'),fsController.update)
  .delete(useAuth,reqValidator(getFundingSourceValidation,'getById'),fsController.remove);

module.exports = router;
