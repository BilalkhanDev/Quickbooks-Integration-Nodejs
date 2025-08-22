// src/app/routes/fleet.route.js
const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleet.controller');
const { useAuth } = require('../middleware/useAuth.middleware');
const validate = require('../middleware/validate.middleware');
const fleetSchema = require('../validation/fleet.schema');

router
  .route('/')
  .post(useAuth,validate(fleetSchema.create),fleetController.create)
  .get(useAuth,fleetController.getAll);

router
  .route('/:id')
  .get(useAuth,validate(fleetSchema.getById),fleetController.getById)
  .put(useAuth,validate(fleetSchema.update),fleetController.update)
  .patch(useAuth,validate(fleetSchema.updateDriver),fleetController.update)
  .delete(useAuth,validate(fleetSchema.delete),fleetController.delete);

module.exports = router;
