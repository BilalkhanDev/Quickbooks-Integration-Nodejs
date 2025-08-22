const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth.middleware');
const inspectionController = require('../controllers/inspection.controller');
const inspectionSubmissionSchema = require('../validation/inspectionSubmission.schema');
const validate = require('../middleware/validate.middleware');

router.get('/specific-detail',
  useAuth,
  inspectionController.getName);
router
  .route('/')
  .post(useAuth, validate(inspectionSubmissionSchema.create), inspectionController.create)
  .get(useAuth, inspectionController.getAll);

router
  .route('/:id')
  .post(useAuth, inspectionController.update)
  .get(useAuth, inspectionController.getById);





module.exports = router;
