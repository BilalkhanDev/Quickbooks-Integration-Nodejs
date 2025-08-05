const express = require('express');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../../shared/middleware/validate.middleware');
const router = express.Router();
const equipmentController=require('../../controllers/common/equipment.controller')

router
    .route('/')
    .post(useAuth,  equipmentController.create)
    .get(useAuth, equipmentController.getAll);


router
    .route('/:id')
    .get(useAuth, equipmentController.getById)
    .patch(useAuth, equipmentController.update)
    .delete(useAuth, equipmentController.remove);

module.exports = router;
