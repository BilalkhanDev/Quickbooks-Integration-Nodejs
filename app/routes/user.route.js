const express = require('express');
const { useAuth, adminOrSelf, adminOnly } = require('../middleware/useAuth.middleware');
const router = express.Router();
const validate = require('../middleware/validate.middleware');

const AuthSchema = require('../validation/auth.schema');
const AuthController = require('../controllers/auth.controller');

router
    .route('/')
    .post(useAuth,adminOnly(),validate(AuthSchema.create()),AuthController.register)
    .get(useAuth,adminOnly(),validate(AuthSchema.getAll()),AuthController.getAll);

router
    .route('/:id')
    .put(useAuth,adminOrSelf,validate(AuthSchema.update()), AuthController.update)
    .get(useAuth,adminOrSelf,validate(AuthSchema.getById()), AuthController.getProfile)
    .delete(useAuth,adminOnly(),validate(AuthSchema.delete()),AuthController.delete)

module.exports = router;

