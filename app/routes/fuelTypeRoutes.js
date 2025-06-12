const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const { create, getAll, update, remove, bulkDelete } = require('../controller/fuelTypeController');

router.delete('/delete',
  useAuth,
  reqValidator('bulkDeleteFleetStatusSchema', 'body'),
  bulkDelete);


router.post('/',
  useAuth,
  reqValidator('fuelTypeSchema', 'body'),
  create
);

router.get('/',
  useAuth,
  getAll
);

router.put('/:id',
  useAuth,
  reqValidator('expenseIdSchema', 'params'),
  reqValidator('fuelTypeUpdateSchema', 'body'),
  update
);

router.delete('/:id',
  useAuth,
  reqValidator('expenseIdSchema', 'params'),
  remove
);

module.exports = router;
