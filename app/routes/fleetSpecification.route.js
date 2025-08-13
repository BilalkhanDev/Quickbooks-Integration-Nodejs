const express = require('express');
const router = express.Router();
// const reqValidator = require('../../shared/middleware/validate.middleware');
const { useAuth } = require('../middleware/useAuth.middleware');
const fleetSpecifcationController = require('../controllers/fleetSpecifcation.controller');


router
    .route('/:fleetId')
    .put(useAuth, fleetSpecifcationController.update)
    .get(useAuth, fleetSpecifcationController.getById);

module.exports = router;
