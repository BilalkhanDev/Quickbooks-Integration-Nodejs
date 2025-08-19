const express = require('express');
const reqValidator = require('../../middleware/validate.middleware');
const router = express.Router();
const ServiceAreaController=require("../../controllers/common/serviceArea.controller");
const { useAuth } = require('../../middleware/useAuth.middleware');
const getServiceAreaValidation = require('../../validation/common/serviceArea.schema');
router
  .route('/')
  .post(useAuth,reqValidator(getServiceAreaValidation,'create'),ServiceAreaController.create)
  .get(useAuth,ServiceAreaController.getAll);


router
  .route('/:id')
  .get(useAuth,reqValidator(getServiceAreaValidation,'getById'),ServiceAreaController.getById)
  .patch(useAuth,reqValidator(getServiceAreaValidation,'update'), ServiceAreaController.update)
  .delete(useAuth,reqValidator(getServiceAreaValidation,'getById'),ServiceAreaController.delete);

module.exports = router;
