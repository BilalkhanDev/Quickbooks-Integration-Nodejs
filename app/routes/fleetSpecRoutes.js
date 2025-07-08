const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');

const { useAuth } = require('../middleware/useAuth');
const { update, get } = require('../controller/fleetSpecController');



router.put('/:id',
  useAuth,
  reqValidator("generiIdSchema", 'params'),
  reqValidator("updateFleetSpecSchema", 'body'),
  update
);

router.get('/:id',
  useAuth,
  reqValidator("generiIdSchema", 'params'),
  get
  
);
module.exports = router;
