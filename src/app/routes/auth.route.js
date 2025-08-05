const express = require('express');
const reqValidator = require('../../shared/middleware/validate.middleware');
const authController = require('../controllers/auth.controller');
const validate = require('../../shared/middleware/validate.middleware');
const getAuthSchema = require('../../shared/validation/auth.schema');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');

const router = express.Router();



router.post('/register',
    validate(getAuthSchema,'register'),
    authController.register
);
router.post('/login',
    validate(getAuthSchema,'login'),
    authController.login
);
router.get('/me',
    useAuth,
    authController.getProfile
);
router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router;
