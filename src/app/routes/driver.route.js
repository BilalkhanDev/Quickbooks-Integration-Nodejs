const express = require('express');
const router = express.Router();
const validate = require('../../shared/middleware/validate.middleware');
const getDriverSchema = require('../../shared/validation/driver.schema');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const driverController = require('../controllers/driver.controller');

router.route('/')
  .post(useAuth, validate(getDriverSchema, 'create'), driverController.create)
  .get(useAuth, driverController.getAll);

router.route('/:id')
  .put(useAuth, validate(getDriverSchema, 'update'), driverController.update)
  .get(useAuth, validate(getDriverSchema, 'getById'), driverController.getById)
 

router.get('/fleet/:fleetId', validate(getDriverSchema, 'getByFleetId'), driverController.getByFleetId);

module.exports = router;
