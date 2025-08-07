const express = require('express');
const router = express.Router();
const fuelTypeController = require('../../controllers/common/fuelType.controller')
const { useAuth } = require('../../middleware/useAuth.middleware');


router.delete('/delete',
  useAuth,
  
  fuelTypeController.bulkDelete);


router
  .route('/')
  .post(useAuth, fuelTypeController.create)
  .get(useAuth, fuelTypeController.getAll);

router
  .route('/:id')
  .put(useAuth, fuelTypeController.update)
  .delete(useAuth,  fuelTypeController.remove);

module.exports = router;
