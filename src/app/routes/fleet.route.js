// src/app/routes/fleet.route.js
const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleet.controller');
const getFleetSchema = require('../validation/fleet.schema');
const { useAuth } = require('../middleware/useAuth.middleware');
const validate = require('../middleware/validate.middleware');

router
  .route('/')
  .post(useAuth,validate(getFleetSchema, 'create'),fleetController.create)
  .get(useAuth,fleetController.getAll);

router
  .route('/:id')
  .get(useAuth,validate(getFleetSchema, 'getById'),fleetController.getById)
  .put(useAuth,validate(getFleetSchema, 'update'),fleetController.update)
  .patch(useAuth,validate(getFleetSchema, 'updateDriver'),fleetController.update)
  .delete(useAuth,validate(getFleetSchema, 'delete'),fleetController.remove);

module.exports = router;
