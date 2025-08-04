const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route')
const fleetRoutes = require('./fleet.route')
const vendorRoutes = require('./vendor.route')
const specficationRoutes = require('./fleetSpec.route')
const serviceRoutes = require("./serviceEntry.route")
const issuesRoutes = require("./issue.route")
const inspectionRoutes = require("./inspection.route")
const inspectionSubmissionRoutes = require("./inspectionSubmission.route")
const driverRoutes = require('./driver.route')
const companyRoutes = require('./company.route')
const commonRoutes = require('./common/common')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/fleet', fleetRoutes);

router.use("/vendor", vendorRoutes)
router.use("/specification", specficationRoutes)
router.use("/service", serviceRoutes)
router.use("/issue", issuesRoutes)
router.use("/inspection", inspectionRoutes)
router.use("/inspection-submission", inspectionSubmissionRoutes)
router.use("/driver", driverRoutes)
router.use("/company", companyRoutes)
//will be move to common folder
router.use("/common", commonRoutes)



module.exports = router;

