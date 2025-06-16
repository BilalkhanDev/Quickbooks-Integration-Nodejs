const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');
const { update } = require('../controller/fleetSpecController');
const { useAuth } = require('../middleware/useAuth');



router.put('/:id',
  useAuth,
  reqValidator("generiIdSchema", 'params'),
  reqValidator("updateFleetSpecSchema", 'body'),
  update
);

module.exports = router;
