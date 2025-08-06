const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const validate = require('../../shared/middleware/validate.middleware');
const getVendorSchema = require('../../shared/validation/vendor.schema');
const { reqValidator } = require('../../shared/middleware');

router
  .route('/')
  .post(
    useAuth,
    validate(getVendorSchema, 'create'),  // Validate request body for creation
    vendorController.create
  )
  .get(useAuth, vendorController.getAll);  

router
  .route('/:id')
  .get(useAuth,reqValidator(getVendorSchema, 'getById'),vendorController.getById)
  .put(
    useAuth,
    validate(getVendorSchema, 'update'),  
    vendorController.update
  )
  .delete(
    useAuth,
    validate(getVendorSchema, 'delete'),  
    vendorController.remove
  );


router
  .route('/delete')
  .post(
    useAuth,
    validate(getVendorSchema, 'bulkDelete'),  // Validate request body for bulk deletion
    vendorController.bulkDelete
  );

module.exports = router;
