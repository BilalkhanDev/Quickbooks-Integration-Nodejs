const express = require('express');
const router = express.Router();
const s3AssetUploader = require('../middleware/multer.middleware'); // Assuming multer middleware is in this file
const { useAuth } = require('../middleware/useAuth.middleware');
const documentController=require('../controllers/documents.controller')

router.route('/')
  .post(useAuth,  s3AssetUploader("documents","documents"), documentController.add)
  .get(useAuth, documentController.getAll);


module.exports = router;
