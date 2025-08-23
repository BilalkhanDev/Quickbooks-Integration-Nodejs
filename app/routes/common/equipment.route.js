const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const router = express.Router();
const equipmentController=require('../../controllers/common/equipment.controller');
const validate = require('../../middleware/validate.middleware');
const EquipmentSchema=require('../../validation/common/equipment.schema')

router
    .route('/')
    .post(useAuth, validate(EquipmentSchema.create()),  equipmentController.create)
    .get(useAuth, equipmentController.getAll);


router
    .route('/:id')
    .get(useAuth,validate(EquipmentSchema.getById()),  equipmentController.getById)
    .patch(useAuth,validate(EquipmentSchema.update()),  equipmentController.update)
    .delete(useAuth,validate(EquipmentSchema.delete()),  equipmentController.delete);

module.exports = router;
