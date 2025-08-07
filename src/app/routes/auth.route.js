const express = require('express');
const validate = require('../middleware/validate.middleware');
const authController = require('../controllers/auth.controller');
const getAuthSchema = require('../validation/auth.schema');
const { useAuth } = require('../middleware/useAuth.middleware');

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
