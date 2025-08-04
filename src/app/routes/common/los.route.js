const express = require('express');
const reqValidator = require('../../../shared/middleware/reqValidator.middleware');
const router = express.Router();
const { create, getAll, getSingle, update, remove } = require('../../controllers/common/los.controller');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const s3AssetUploader = require('../../../shared/middleware/multer.middleware');

router
  .route('/')
  .post(useAuth, s3AssetUploader("common/los", "profileImage"),reqValidator("losSchema","body"),create )
  .get(useAuth,getAll);




router
  .route('/:id')
  .get(useAuth,getSingle)
  .patch(useAuth,s3AssetUploader("common/los", "profileImage"), reqValidator("losSchema","body"),reqValidator("generiIdSchema","params"),update)
  .delete(useAuth,remove);

module.exports = router;
