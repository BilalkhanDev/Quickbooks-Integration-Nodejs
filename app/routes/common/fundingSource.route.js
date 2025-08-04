const express = require('express');
const { useAuth } = require('../../middleware/useAuth');
const reqValidator = require('../../middleware/reqValidator');
const { create, getAll, getSingle, update, remove } = require('../../controller/common/fundingSource.controller');
const s3AssetUploader = require('../../middleware/multer');
const router = express.Router();

router
  .route('/')
  .post(useAuth,s3AssetUploader("common/fs", "profileImage"), reqValidator("createFundingSourceSchema","body"),create)
  .get(useAuth, getAll);


router
  .route('/:id')
  .get(useAuth,getSingle)
  .patch(useAuth,s3AssetUploader("common/fs", "profileImage"),reqValidator("createFundingSourceSchema","body"),update)
  .delete(useAuth,remove);

module.exports = router;
