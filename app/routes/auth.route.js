const express = require('express');
const validate = require('../middleware/validate.middleware');
const authController = require('../controllers/auth.controller');

const { useAuth } = require('../middleware/useAuth.middleware');
const AuthSchema = require('../validation/auth.schema');

const router = express.Router();
router.get('/authenticate', authController.authenticate);

router.get('/callback', authController.oauthCallback);


// router.post('/register',
//     validate(AuthSchema.register()),
//     authController.register
// );
// router.post('/login',
//     validate(AuthSchema.login()),
//     authController.login
// );
// router.get('/me',
//     useAuth,
//     authController.getProfile
// );
// router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router;
