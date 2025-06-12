const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const { bulkRemove, create, getAll, getById, update, remove } = require('../controller/expenseController');

router.delete('/delete',
  useAuth,
  reqValidator('bulkDeleteFleetStatusSchema', 'body'),
  bulkRemove);


router.post('/',
  useAuth,
  reqValidator('createExpenseSchema', 'body'),
  create
);

router.get('/',
  useAuth,
  getAll
);

router.get('/:id',
  useAuth,
  reqValidator('expenseIdSchema', 'params'),
  getById
);

router.put('/:id',
  useAuth,
  reqValidator('expenseIdSchema', 'params'),
  reqValidator('updateExpenseSchema', 'body'),
  update
);

router.delete('/:id',
  useAuth,
  reqValidator('expenseIdSchema', 'params'),
  remove
);

module.exports = router;
