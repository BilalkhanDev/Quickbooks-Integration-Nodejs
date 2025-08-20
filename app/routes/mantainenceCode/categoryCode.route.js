const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const router = express.Router();
// const reqValidator = require('../middleware/validate.middleware');
const CategoryCodeController=require('../../controllers/maintenanceCode/categoryCode.controller')

router
    .route('/')
    .post(useAuth, CategoryCodeController.create)
    .get(useAuth, CategoryCodeController.getAll);

router
    .route('/:id')
    .post(useAuth, CategoryCodeController.update)
    .get(useAuth, CategoryCodeController.getById)
    .delete(useAuth, CategoryCodeController.delete)

module.exports = router;
