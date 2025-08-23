const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const s3AssetUploader = require('../../middleware/multer.middleware');
const fundingSourceController=require('../../controllers/common/fundingSource.controller');
const validate = require('../../middleware/validate.middleware');
const fundingSourceSchema = require('../../validation/common/fundingSource.schema');
const router = express.Router();

router
  .route('/')
  .post(useAuth,s3AssetUploader("common/fs", "profileImage"),validate(fundingSourceSchema.create()),fundingSourceController.create)
  .get(useAuth,validate(fundingSourceSchema.getAll()), fundingSourceController.getAll);


router
  .route('/:id')
  .get(useAuth,validate(fundingSourceSchema.getById()),fundingSourceController.getById)
  .patch(useAuth,s3AssetUploader("common/fs", "profileImage"),validate(fundingSourceSchema.update()),fundingSourceController.update)
  .delete(useAuth,validate(fundingSourceSchema.delete()),fundingSourceController.delete);

module.exports = router;
