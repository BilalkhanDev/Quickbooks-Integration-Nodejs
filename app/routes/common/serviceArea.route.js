const express = require('express');
const reqValidator = require('../../middleware/validate.middleware');
const router = express.Router();
const {create,update,getAll,getSingle,remove}=require("../../controllers/common/serviceArea.controller");
const { useAuth } = require('../../middleware/useAuth.middleware');
const getServiceAreaValidation = require('../../validation/common/serviceArea.schema');
router
  .route('/')
  .post(useAuth,reqValidator(getServiceAreaValidation,'create'),create)
  .get(useAuth,getAll);


router
  .route('/:id')
  .get(useAuth,reqValidator(getServiceAreaValidation,'getById'),getSingle)
  .patch(useAuth,reqValidator(getServiceAreaValidation,'update'), update)
  .delete(useAuth,reqValidator(getServiceAreaValidation,'getById'),remove);

module.exports = router;
