const express = require('express');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../../shared/middleware/validate.middleware');
const { create, getAll, getSingle, update, remove } = require('../../controllers/common/fundingSource.controller');
const s3AssetUploader = require('../../../shared/middleware/multer.middleware');
const router = express.Router();

router
  .route('/')
  .post(useAuth,s3AssetUploader("common/fs", "profileImage"))
  .get(useAuth, getAll);


router
  .route('/:id')
  .get(useAuth,getSingle)
  .patch(useAuth,s3AssetUploader("common/fs", "profileImage"),update)
  .delete(useAuth,remove);

module.exports = router;
