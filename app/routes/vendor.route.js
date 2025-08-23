const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendor.controller');
const { useAuth } = require('../middleware/useAuth.middleware');
const validate = require('../middleware/validate.middleware');
const getVendorSchema = require('../validation/vendor.schema');
const vendorSchema = require('../validation/vendor.schema');


router
  .route('/')
  .post(
    useAuth,
    validate(vendorSchema.create()),
    vendorController.create
  )
  .get(useAuth, validate(vendorSchema.getAll()), vendorController.getAll);  

router
  .route('/:id')
  .get(useAuth, validate(vendorSchema.getById()),vendorController.getById)
  .put(
    useAuth,
     validate(vendorSchema.update()),
    vendorController.update
  )
  .delete(
    useAuth,
    validate(vendorSchema.delete()),
    vendorController.delete
  );


router
  .route('/delete')
  .post(
    useAuth,
    // validate(getVendorSchema, 'bulkDelete'),  // Validate request body for bulk deletion
    vendorController.bulkDelete
  );

module.exports = router;
