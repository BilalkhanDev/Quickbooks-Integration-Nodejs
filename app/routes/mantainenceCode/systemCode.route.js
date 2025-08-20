const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const router = express.Router();
// const reqValidator = require('../middleware/validate.middleware');
const SystemCodeController=require('../../controllers/maintenanceCode/systemCode.controller')

router
    .route('/')
    .post(useAuth, SystemCodeController.create)
 
router
    .route('/:categoryId')
    .get(useAuth, SystemCodeController.getAll)
    
router
    .route('/:id')
    .get(useAuth, SystemCodeController.getById)
    .delete(useAuth, SystemCodeController.delete)

module.exports = router;
