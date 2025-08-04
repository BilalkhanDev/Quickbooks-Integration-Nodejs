const express = require('express');
const router = express.Router();
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const { bulkRemove, create, getAll, getById, update, remove } = require('../controllers/expenseController');

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
  reqValidator('generiIdSchema', 'params'),
  getById
);

router.put('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  reqValidator('updateExpenseSchema', 'body'),
  update
);

router.delete('/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
  remove
);

module.exports = router;
