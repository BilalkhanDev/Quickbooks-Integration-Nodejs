const express = require('express');
const router = express.Router();
const reqValidator = require('../middleware/validate.middleware');
const { useAuth } = require('../middleware/useAuth.middleware');
const companyController=require('../controllers/company.controller')

router
    .route('/')
    .post(useAuth, companyController.create)
    .get(useAuth, companyController.getAll);

router
    .route('/:id')
    .post(useAuth, companyController.update)
    .get(useAuth, companyController.getById)
    .delete(useAuth, companyController.delete)

module.exports = router;
