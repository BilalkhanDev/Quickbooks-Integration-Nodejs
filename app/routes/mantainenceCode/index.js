const express = require('express');
const router = express.Router();

const CategoryCodeRoutes = require('./categoryCode.route');
const SystemCodeRoutes = require('./systemCode.route');
const AssemblyCodeRoutes = require('./assemblyCode.route');
const ReasonCodeRoutes = require('./reasonCode.route');





router.use('/categoryCode', CategoryCodeRoutes);
router.use('/systemCode',SystemCodeRoutes);
router.use('/assemblyCode',AssemblyCodeRoutes);
router.use('/reason',ReasonCodeRoutes);






module.exports = router;
