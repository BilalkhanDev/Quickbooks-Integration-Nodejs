// src/app/routes/fleet.route.js
const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth.middleware');
const validate = require('../middleware/validate.middleware');
const inspectionScheduleController = require('../controllers/inspectionSchedule.controller');
const inspectionScheduleSchema = require('../validation/inspectionSchedule.schema');

router
  .route('/')
  .post(useAuth,validate(inspectionScheduleSchema.create()),inspectionScheduleController.create)

router
  .route('/fleet/:fleetId')
  .get(useAuth,validate(inspectionScheduleSchema.getAll()),inspectionScheduleController.getAll);
router
  .route('/:id')
  .get(useAuth,validate(inspectionScheduleSchema.getById()),inspectionScheduleController.getById)
  .delete(useAuth,validate(inspectionScheduleSchema.delete()),inspectionScheduleController.delete);

module.exports = router;
