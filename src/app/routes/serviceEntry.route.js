const express = require('express');
const router = express.Router();
const s3AssetUploader = require('../middleware/multer.middleware');
const { useAuth } = require('../middleware/useAuth.middleware');
const reqValidator = require('../middleware/validate.middleware');
const serviceEntryController = require('../controllers/serviceEntry.controller');
const getServiceEntrySchema = require('../validation/serviceEntry.schema');

router
  .route('/')
  .post(
    useAuth,
    // s3AssetUploader("services", "documents"),
    reqValidator(getServiceEntrySchema,'create'),
    serviceEntryController.create
  );

router
  .route('/:id')
  .put(
    useAuth,
    // s3AssetUploader("services", "documents"),
    reqValidator(getServiceEntrySchema,'update'),
    serviceEntryController.update
  )
  .get(
    useAuth,
    reqValidator(getServiceEntrySchema,'getById'),
    serviceEntryController.getById
  );

router.get(
  '/fleet/:fleetId',
  useAuth,
  reqValidator(getServiceEntrySchema,'getByFleetId'),
  serviceEntryController.getByFleetId
);

module.exports = router;
