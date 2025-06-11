const express = require('express');
const reqValidator = require('../middleware/reqValidator');
const { register, login, refreshAccessToken, externalLogin } = require('../controller/authController');

const router = express.Router();
router.post ('/token', externalLogin)
router.post('/register',
    reqValidator("registerSchema", "body"),
    register
);
router.post('/login',
    reqValidator("loginSchema", "body"),
    login
);
router.post('/refresh-token', refreshAccessToken);

module.exports = router;
