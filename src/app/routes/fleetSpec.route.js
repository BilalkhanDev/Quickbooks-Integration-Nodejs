const express = require('express');
const router = express.Router();
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const { update, getById } = require('../controllers/fleetSpec.controller');

router
    .route('/:fleetId')
    .put(useAuth,reqValidator("genericfleetIdSchema", 'params'),reqValidator("updateFleetSpecSchema", 'body'), update)
    .get(useAuth,reqValidator("genericfleetIdSchema", 'params'),getById);

module.exports = router;
