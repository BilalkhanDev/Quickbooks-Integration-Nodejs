const express = require('express');
const router = express.Router();
const reqValidator = require('../../shared/middleware/validate.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const inspectionController = require('../controllers/inspection.controller')
router
  .route('/')
  .post(useAuth,  inspectionController.create)
  .get(useAuth, inspectionController.getAll);

router
  .route('/:id')
  .post(useAuth, inspectionController.update)
  .get(useAuth, inspectionController.getById);

router.get('/specific-detail',
  useAuth,
  inspectionController.getName);



module.exports = router;
