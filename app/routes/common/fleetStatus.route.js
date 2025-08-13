const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const { reqValidator } = require('../../middleware');
const fleetStatusController=require('../../controllers/common/status.controller')
const router = express.Router();

router
  .route('/')
  .post(useAuth,  fleetStatusController.create)
  .get(useAuth,  fleetStatusController.getAll)

router
  .route('/:id')
  .put(useAuth,  fleetStatusController.update)
  .get(useAuth,  fleetStatusController.getById)
  .delete(useAuth,  fleetStatusController.delete)


router.delete('/delete',
    useAuth,
    
    fleetStatusController.bulkRemove
);

module.exports = router;
