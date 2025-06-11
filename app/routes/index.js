const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes=require('./userRoutes')
const fleetRoutes=require('./fleetRoutes')
const router = express.Router();

router.use('/auth',  authRoutes);
router.use('/user',userRoutes );
router.use('/fleet', fleetRoutes);


module.exports = router;

