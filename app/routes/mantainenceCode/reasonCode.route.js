const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const router = express.Router();
// const reqValidator = require('../middleware/validate.middleware');
const ReasonCodeController=require('../../controllers/maintenanceCode/reasonCode.controller')

router
    .route('/')
    .get(useAuth, ReasonCodeController.getAll)
    .post(useAuth, ReasonCodeController.create)
    
 

    
router
    .route('/:id')
    .get(useAuth, ReasonCodeController.getById)
    .delete(useAuth, ReasonCodeController.delete)

module.exports = router;
