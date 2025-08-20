const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const router = express.Router();
// const reqValidator = require('../middleware/validate.middleware');
const AssemblyCodeController=require('../../controllers/maintenanceCode/assemblyCode.controller')

router
    .route('/')
    .post(useAuth, AssemblyCodeController.create)
 
router
    .route('/:systemId')
    .get(useAuth, AssemblyCodeController.getAll)
    
router
    .route('/:id')
    .get(useAuth, AssemblyCodeController.getById)
    .delete(useAuth, AssemblyCodeController.delete)

module.exports = router;
