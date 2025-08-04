const express = require('express');
const router = express.Router();
const s3AssetUploader = require('../../shared/middleware/multer.middleware');
const { createServiceEntry, updateServiceEntry, getServiceEntryByFleetId, getServiceById } = require('../controllers/serviceEntry.controller');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../shared/middleware/reqValidator.middleware');

router.get('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  getServiceById
);

router.post('/',
  useAuth,
  s3AssetUploader("services", "documents"),
  createServiceEntry
);
router.put('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  s3AssetUploader("services", "documents"),
  // reqValidator('updateServiceEntrySchema', 'body'),
  updateServiceEntry
);

router.get('/fleet/:fleetId',
  useAuth,
  reqValidator('genericfleetIdSchema', 'params'),
  getServiceEntryByFleetId
);

module.exports = router;
