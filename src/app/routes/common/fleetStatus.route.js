const express = require('express');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const { reqValidator } = require('../../../shared/middleware');
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
  .delete(useAuth,  fleetStatusController.remove)


router.delete('/delete',
    useAuth,
    
    fleetStatusController.bulkRemove
);

module.exports = router;
