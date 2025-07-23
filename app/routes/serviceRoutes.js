const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const { createServiceEntry, getServiceEntryById, updateServiceEntry, getServiceEntryByFleetId, getServiceById } = require('../controller/serviceEntryController');
const { useAuth } = require('../middleware/useAuth');
const reqValidator = require('../middleware/reqValidator');

router.get('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  getServiceById
);

router.post('/',
  useAuth,
  upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'documents', maxCount: 3 }
  ]),
  createServiceEntry
);
router.put('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  upload.fields([
    { name: 'photos', maxCount: 5 },
    { name: 'documents', maxCount: 3 }
  ]),
  reqValidator('updateServiceEntrySchema', 'body'),
  updateServiceEntry
);

router.get('/fleet/:fleetId',
  useAuth,
  reqValidator('genericfleetIdSchema', 'params'),
  getServiceEntryByFleetId
);

module.exports = router;
