const express = require('express');
const { useAuth } = require('../middleware/useAuth.middleware');
const router = express.Router();
const ServiceTaskController=require('../controllers/serviceTask.controller');
const validate = require('../middleware/validate.middleware');
const serviceTaskSchema = require('../validation/serviceTask.schema');

router
    .route('/')
    .post(useAuth,validate(serviceTaskSchema.create()), ServiceTaskController.create)
    .get(useAuth, validate(serviceTaskSchema.getAll()),ServiceTaskController.getAll);

router
    .route('/:id')
    .put(useAuth,validate(serviceTaskSchema.update()), ServiceTaskController.update)
    .get(useAuth,validate(serviceTaskSchema.getById()), ServiceTaskController.getById)
    .delete(useAuth,validate(serviceTaskSchema.delete()), ServiceTaskController.delete)

module.exports = router;
