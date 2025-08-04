const express = require('express');
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { authController } = require('../controllers');

const router = express.Router();

router.post('/register',
    reqValidator("registerSchema", "body"),
    authController.register
);
router.post('/login',
    reqValidator("loginSchema", "body"),
    authController.login
);
// router.post('/me',
//     reqValidator("getProfile", "body"),
//     me
// );
router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router;
