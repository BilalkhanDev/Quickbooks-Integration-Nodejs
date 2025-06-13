const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const { createServiceEntry, getServiceEntryById } = require('../controller/serviceEntryController');
const { useAuth } = require('../middleware/useAuth');
const reqValidator = require('../middleware/reqValidator');

const uploadFiles = upload.fields([
  { name: 'photos', maxCount: 5 },
  { name: 'documents', maxCount: 3 }
]);

router.post('/',
  useAuth, 
  uploadFiles, 
  createServiceEntry);
router.get('/:fleetId',
   useAuth,  
   reqValidator('fleetServiceIdSchema', 'params'),
   getServiceEntryById);

module.exports = router;
