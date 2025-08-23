const express = require('express');
const router = express.Router();
const ServiceAreaController=require("../../controllers/common/serviceArea.controller");
const { useAuth } = require('../../middleware/useAuth.middleware');
const validate = require('../../middleware/validate.middleware');
const serviceAreaSchema = require('../../validation/common/serviceArea.schema');

router
  .route('/')
  .post(useAuth,validate(serviceAreaSchema.create()),ServiceAreaController.create)
  .get(useAuth,validate(serviceAreaSchema.getAll()),ServiceAreaController.getAll);


router
  .route('/:id')
  .get(useAuth,validate(serviceAreaSchema.getById()),ServiceAreaController.getById)
  .patch(useAuth,validate(serviceAreaSchema.update()), ServiceAreaController.update)
  .delete(useAuth,validate(serviceAreaSchema.delete()),ServiceAreaController.delete);

module.exports = router;
