const express = require('express');
const router = express.Router();

const fundingSourceRoutes = require('./fundingSource.route');
const spaceTypeRoutes = require('./spaceType.route');
const serviceAreaRoutes = require('./serviceArea.route');
const equipmentRoutes = require('./equipment.route');
const losRoutes = require('./los.route');
const fleetTypeRoutes = require('./type.route');
const fuelTypeRoutes = require('./fuelType.route');
const fleetStatusRoutes = require('./fleetStatus.route');
const expenseRoutes = require('./expense.route');


router.use('/fs', fundingSourceRoutes);
router.use('/space-type', spaceTypeRoutes);
router.use('/service-area', serviceAreaRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/los', losRoutes);
router.use('/fuel-type', fuelTypeRoutes);
router.use('/type', fleetTypeRoutes);
router.use('/fleet-status', fleetStatusRoutes);
router.use('/expense', expenseRoutes);




module.exports = router;
