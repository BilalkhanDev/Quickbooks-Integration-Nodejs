const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const { getAll, updateInspection, getInspectionById, createInspection } = require('../controller/inspectionController');


router.get('/',
  useAuth,
  getAll);

router.put('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  updateInspection
);

router.get('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  getInspectionById
);

router.post('/',
  useAuth,
  reqValidator('createInspectionSchema', 'body'),
  createInspection
);

module.exports = router;
