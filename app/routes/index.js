const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes=require('./user.route')
const commonRoutes = require('./common/common')

const roleRoutes=require('./role.route')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/role',roleRoutes)
router.use('/user', userRoutes);




router.use("/common", commonRoutes)



module.exports = router;

