const express = require('express');
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { adminOnly, useAuth, adminOrSelf } = require('../../shared/middleware/useAuth.middleware');
const { getAllUsers, getSingleUser } = require('../controllers/user.controller');
const { USER_ROLES } = require('../../shared/constants/role');

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
