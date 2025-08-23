// src/app/routes/fleet.route.js
const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth.middleware');
const validate = require('../middleware/validate.middleware');
const roleController = require('../controllers/role.controller');
const roleSchema = require('../validation/role.schema');



router
  .route('/')
  .post(useAuth,validate(roleSchema.create()),roleController.create)
  .get(useAuth,validate(roleSchema.getAll()),roleController.getAll);

router
  .route('/:id')
  .get(useAuth,validate(roleSchema.getById()),roleController.getById)
  .put(useAuth,validate(roleSchema.update()),roleController.update)
  .delete(useAuth,validate(roleSchema.delete()),roleController.delete);

module.exports = router;
