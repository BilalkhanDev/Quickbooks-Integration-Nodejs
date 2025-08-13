const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const reqValidator = require('../../middleware/validate.middleware');
const s3AssetUploader = require('../../middleware/multer.middleware');
const fundingSourceController=require('../../controllers/common/fundingSource.controller');
const getFundingSourceValidation = require('../../validation/common/fundingSource.schema');
const router = express.Router();

router
  .route('/')
  .post(useAuth,s3AssetUploader("common/fs", "profileImage"),reqValidator(getFundingSourceValidation,'create'),fundingSourceController.create)
  .get(useAuth, fundingSourceController.getAll);


router
  .route('/:id')
  .get(useAuth,reqValidator(getFundingSourceValidation,'getById'),fundingSourceController.getById)
  .patch(useAuth,s3AssetUploader("common/fs", "profileImage"),reqValidator(getFundingSourceValidation,'update'),fundingSourceController.update)
  .delete(useAuth,reqValidator(getFundingSourceValidation,'getById'),fundingSourceController.delete);

module.exports = router;
