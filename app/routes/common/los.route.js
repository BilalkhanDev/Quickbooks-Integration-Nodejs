const express = require('express');
const reqValidator = require('../../middleware/reqValidator');
const router = express.Router();
const { create, getAll, getSingle, update, remove } = require('../../controller/common/los.controller');
const { useAuth } = require('../../middleware/useAuth');
const s3AssetUploader = require('../../middleware/multer');

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
