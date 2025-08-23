const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth.middleware');
const serviceEntryController = require('../controllers/serviceEntry.controller');
const validate = require('../middleware/validate.middleware');
const serviceEntrySchema = require('../validation/serviceEntry.schema');

router
  .route('/')
  .post(
    useAuth,
    validate(serviceEntrySchema.create()),
    serviceEntryController.create
  );

router
  .route('/:id')
  .put(
    useAuth,
    validate(serviceEntrySchema.update()),
    serviceEntryController.update
  )
  .get(
    useAuth,
    validate(serviceEntrySchema.getById()),
    serviceEntryController.getById
  );

router.get(
  '/fleet/:fleetId',
  useAuth,
  validate(serviceEntrySchema.getByFleetId()),
  serviceEntryController.getByFleetId
);

module.exports = router;
