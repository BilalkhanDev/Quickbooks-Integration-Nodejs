// routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const reqValidator = require('../../shared/middleware/reqValidator.middleware');
const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const {create,update,getByFleetId,getById,getAll} = require("../controllers/driver.controller");
router
  .route('/')
  .post(useAuth,create)
  .get(useAuth, getAll);

router
  .route('/:id')
  .put(useAuth, update)
  .get(useAuth, getById);

router.get("/fleet/:fleetId", getByFleetId);

module.exports = router;
