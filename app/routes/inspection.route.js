const express = require('express');
const router = express.Router();
const { useAuth } = require('../middleware/useAuth.middleware');
const inspectionController = require('../controllers/inspection.controller');


router.get('/specific-detail',
  useAuth,
  inspectionController.getName);
router
  .route('/')
  .post(useAuth, inspectionController.create)
  .get(useAuth, inspectionController.getAll);

router
  .route('/:id')
  .post(useAuth, inspectionController.update)
  .get(useAuth, inspectionController.getById);





module.exports = router;
