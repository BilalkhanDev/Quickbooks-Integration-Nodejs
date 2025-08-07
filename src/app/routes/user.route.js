const express = require('express');
const reqValidator = require('../middleware/reqValidator.middleware');
const { adminOnly, useAuth, adminOrSelf } = require('../middleware/useAuth.middleware');
const userController=require('../controllers/user.controller')
const { USER_ROLES } = require('../shared/constants/role');

const router = express.Router();

router.get('/',
    useAuth,
    adminOnly(USER_ROLES.ADMIN),
    userController.getAllUsers);

// single user 
router.get('/:id',
    useAuth,
    
    adminOrSelf,
    userController.getSingleUser);
module.exports = router;
