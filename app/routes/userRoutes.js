const express = require('express');
const reqValidator = require('../middleware/reqValidator');
const { adminOnly, useAuth, adminOrSelf } = require('../middleware/useAuth');
const { getAllUsers, getSingleUser } = require('../controller/userController');
const { USER_ROLES } = require('../constants/role');

const router = express.Router();

router.get('/all',
    useAuth,
    adminOnly(USER_ROLES.ADMIN),
    getAllUsers);

// single user 
router.get('/:id',
    useAuth,
    reqValidator("generiIdSchema", "params"),
    adminOrSelf,
    getSingleUser);
module.exports = router;
