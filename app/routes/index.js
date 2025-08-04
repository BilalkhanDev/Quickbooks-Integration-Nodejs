const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes')
const fleetRoutes = require('./fleetRoutes')
const statusRoutes = require('./fleetStatusRoutes')
const typeRoutes = require('./typeRoutes')
const expenseRoutes = require('./expenseRoutes')
const vendorRoutes = require('./vendorRoutes')
const specficationRoutes=require('./fleetSpecRoutes')
const serviceRoutes=require("./serviceRoutes")
const issuesRoutes=require("./issueRoutes")
const inspectionRoutes=require("./inspectionRoutes")
const inspectionSubmissionRoutes=require("./inspectionSubmissionRoutes")
const driverRoutes=require('./driverRoutes')
const companyRoutes=require('./companyRoutes')
const fundingSourceRoutes=require('./common/fundingSource.route')
const losRoutes=require("./common/los.route")
const serviceAreaRoutes=require("./common/serviceArea.route")
const spaceTypeRoutes=require("./common/spaceType.route");
const equipmentRoutes=require("./common/equipment.route")

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/fleet', fleetRoutes);
router.use("/status", statusRoutes)
router.use("/type", typeRoutes)
router.use("/expense", expenseRoutes)
router.use("/vendor", vendorRoutes)
router.use("/specification", specficationRoutes)
router.use("/service",serviceRoutes)
router.use("/issue",issuesRoutes)
router.use("/inspection",inspectionRoutes)
router.use("/inspection-submission",inspectionSubmissionRoutes)
router.use("/driver",driverRoutes)
router.use("/company",companyRoutes)
//will be move to common folder
router.use("/common/fs",fundingSourceRoutes)
router.use("/common/space-type",spaceTypeRoutes)
router.use("/common/service-area",serviceAreaRoutes)
router.use("/common/equipment",equipmentRoutes)
router.use("/common/los",losRoutes)


module.exports = router;

