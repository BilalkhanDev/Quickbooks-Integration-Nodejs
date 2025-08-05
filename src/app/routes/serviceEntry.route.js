const express = require('express');
const router = express.Router();
const s3AssetUploader = require('../../shared/middleware/multer.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../shared/middleware/validate.middleware');
const serviceEntryController = require('../controllers/serviceEntry.controller')

router
  .route('/')
  .post(useAuth, s3AssetUploader("services", "documents"), serviceEntryController.create)

router
  .route('/:id')
  .put(useAuth,
    s3AssetUploader("services", "documents"), serviceEntryController.update)
  .get(useAuth,serviceEntryController.getById)

router.get('/fleet/:fleetId',
  useAuth,

  serviceEntryController.getByFleetId
)
module.exports = router;
