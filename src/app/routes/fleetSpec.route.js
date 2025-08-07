const express = require('express');
const router = express.Router();
// const reqValidator = require('../../shared/middleware/validate.middleware');
const { useAuth } = require('../middleware/useAuth.middleware');
const fleetSpecController=require('../controllers/fleetSpec.controller')

router
    .route('/:fleetId')
    .put(useAuth, fleetSpecController.update)
    .get(useAuth,fleetSpecController.getById);

module.exports = router;
