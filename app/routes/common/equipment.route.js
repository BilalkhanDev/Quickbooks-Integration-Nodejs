const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const reqValidator = require('../../middleware/validate.middleware');
const router = express.Router();
const equipmentController=require('../../controllers/common/equipment.controller');
const getEquipmentSchema = require('../../validation/common/equipment.schema');

router
    .route('/')
    .post(useAuth, reqValidator(getEquipmentSchema,'create'),  equipmentController.create)
    .get(useAuth, equipmentController.getAll);


router
    .route('/:id')
    .get(useAuth,reqValidator(getEquipmentSchema,'getById'),  equipmentController.getById)
    .patch(useAuth,reqValidator(getEquipmentSchema,'update'),  equipmentController.update)
    .delete(useAuth,reqValidator(getEquipmentSchema,'getById'),  equipmentController.delete);

module.exports = router;
