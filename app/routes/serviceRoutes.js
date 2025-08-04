const express = require('express');
const router = express.Router();
const s3AssetUploader = require('../middleware/multer');
const { createServiceEntry, updateServiceEntry, getServiceEntryByFleetId, getServiceById } = require('../controller/serviceEntryController');
const { useAuth } = require('../middleware/useAuth');
const reqValidator = require('../middleware/reqValidator');

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
