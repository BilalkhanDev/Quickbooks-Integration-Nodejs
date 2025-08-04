// routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const reqValidator = require('../middleware/reqValidator');
const { useAuth } = require('../middleware/useAuth');
const {create,update,getByFleetId,getById,getAll} = require("../controller/driverController");
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
