// src/app/routes/fleet.route.js
const express = require('express');
const router = express.Router();
const fleetController = require('../controllers/fleet.controller');
const getFleetSchema = require('../../shared/validation/fleet.schema');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const validate = require('../../shared/middleware/validate.middleware');

router
  .route('/')
  .post(useAuth,validate(getFleetSchema, 'create'),fleetController.create)
  .get(useAuth,fleetController.getAll);

router
  .route('/:id')
  .get(useAuth,validate(getFleetSchema, 'getById'),fleetController.getById)
  .put(useAuth,validate(getFleetSchema, 'update'),fleetController.update)
  .delete(useAuth,validate(getFleetSchema, 'delete'),fleetController.remove);

module.exports = router;
