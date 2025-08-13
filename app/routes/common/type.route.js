const express = require('express');
const typeController = require('../../controllers/common/type.controller')
const reqValidator = require('../../middleware/validate.middleware');
const { useAuth } = require('../../middleware/useAuth.middleware');

const router = express.Router();

router
  .route('/')
  .post(useAuth, typeController.create)
  .get(useAuth, typeController.getAll)

router
  .route('/:id')
  .put(useAuth, typeController.update)
  .delete(useAuth,  typeController.delete)


router.delete('/delete',
  useAuth,

  typeController.bulkDelete
);


module.exports = router;
