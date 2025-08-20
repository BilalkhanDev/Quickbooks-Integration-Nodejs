const express = require('express');
const { useAuth } = require('../middleware/useAuth.middleware');
const router = express.Router();
// const reqValidator = require('../middleware/validate.middleware');
const ServiceTaskController=require('../controllers/serviceTask.controller')

router
    .route('/')
    .post(useAuth, ServiceTaskController.create)
    .get(useAuth, ServiceTaskController.getAll);

router
    .route('/:id')
    .post(useAuth, ServiceTaskController.update)
    .get(useAuth, ServiceTaskController.getById)
    .delete(useAuth, ServiceTaskController.delete)

module.exports = router;
