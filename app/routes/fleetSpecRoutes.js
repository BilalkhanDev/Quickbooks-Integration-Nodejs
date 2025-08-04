const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const { update, getById } = require('../controller/fleetSpecController');

router
    .route('/:fleetId')
    .put(useAuth,reqValidator("genericfleetIdSchema", 'params'),reqValidator("updateFleetSpecSchema", 'body'), update)
    .get(useAuth,reqValidator("genericfleetIdSchema", 'params'),getById);

module.exports = router;
