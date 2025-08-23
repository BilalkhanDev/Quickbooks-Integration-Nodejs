const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate.middleware');
const { useAuth } = require('../middleware/useAuth.middleware');
const driverController = require('../controllers/driver.controller');
const driverSchema = require('../validation/driver.schema');

router.route('/')
  .post(useAuth, validate(driverSchema.create), driverController.create)
  .get(useAuth, driverController.getAll);

router.route('/:id')
  .put(useAuth, validate(driverSchema.update), driverController.update)
  .get(useAuth, validate(driverSchema.getById), driverController.getById)
 

router.get('/fleet/:fleetId', validate(driverSchema.getByFleetId), driverController.getByFleetId);

module.exports = router;
