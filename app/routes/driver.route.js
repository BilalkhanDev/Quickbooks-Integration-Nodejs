const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate.middleware');
const getDriverSchema = require('../validation/driver.schema');
const { useAuth } = require('../middleware/useAuth.middleware');
const driverController = require('../controllers/driver.controller');

router.route('/')
  .post(useAuth, validate(getDriverSchema, 'create'), driverController.create)
  .get(useAuth, driverController.getAll);

router.route('/:id')
  .put(useAuth, validate(getDriverSchema, 'update'), driverController.update)
  .get(useAuth, validate(getDriverSchema, 'getById'), driverController.getById)
 

router.get('/fleet/:fleetId', validate(getDriverSchema, 'getByFleetId'), driverController.getByFleetId);

module.exports = router;
