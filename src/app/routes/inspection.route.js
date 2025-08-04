const express = require('express');
const router = express.Router();
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const { getAll, updateInspection, getInspectionById, createInspection, getName } = require('../controllers/inspection.controller');


router.get('/',
  useAuth,
  getAll);

router.get('/specific-detail',
  useAuth,
  getName);

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
