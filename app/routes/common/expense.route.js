const express = require('express');
const router = express.Router();
const expenseController = require('../../controllers/common/expense.controller')
const { reqValidator } = require('../../middleware');
const { useAuth } = require('../../middleware/useAuth.middleware');

router.delete('/delete',
  useAuth,

  expenseController.bulkRemove);

router
  .route('/')
  .post(useAuth,  expenseController.create)
  .get(useAuth, expenseController.getAll)

router
  .route('/:id')
  .put(useAuth,   expenseController.update)
  .get(useAuth,  expenseController.getById)
  .delete(useAuth,  expenseController.delete)



module.exports = router;
