const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes')
const fleetRoutes = require('./fleetRoutes')
const statusRoutes = require('./fleetStatusRoutes')
const typeRoutes = require('./typeRoutes')
const expenseRoutes = require('./expenseRoutes')
const vendorRoutes = require('./vendorRoutes')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/fleet', fleetRoutes);
router.use("/status", statusRoutes)
router.use("/type", typeRoutes)
router.use("/expense", expenseRoutes)
router.use("/vendor", vendorRoutes)


module.exports = router;

