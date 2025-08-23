const express = require('express');
const router = express.Router();
const losController = require("../../controllers/common/los.controller")
const { useAuth } = require('../../middleware/useAuth.middleware');
const s3AssetUploader = require('../../middleware/multer.middleware');
const validate = require('../../middleware/validate.middleware');
const losSchema = require('../../validation/common/los.schema');


router
  .route('/')
  .post(useAuth, s3AssetUploader("common/los", "profileImage"), validate(losSchema.create()), losController.create)
  .get(useAuth, validate(losSchema.getAll()), losController.getAll);

router
  .route('/:id')
  .get(useAuth, validate(losSchema.getById()), losController.getById)
  .patch(useAuth, s3AssetUploader("common/los", "profileImage"), validate(losSchema.update()), losController.update)
  .delete(useAuth, validate(losSchema.delete()), losController.delete);

module.exports = router;
