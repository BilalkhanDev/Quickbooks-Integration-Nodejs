const express = require('express');
const { useAuth, adminOnly } = require('../middleware/useAuth');
const { USER_ROLES } = require('../constants/role');
const reqValidator = require('../middleware/reqValidator');

const {
  createFleetController,
  getAllFleetsController,
  getFleetByIdController,
  updateFleetController,
  deleteFleetController,
  getFleetSpecController,
} = require('../controller/fleetController');



const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// ✅ SPECIFIC ROUTES FIRST (to avoid being overridden by generic /:id routes)
// ─────────────────────────────────────────────────────────────────────────────



router.post(
  '/specf',
  useAuth,
  reqValidator("getfleetSpecfSchema", 'body'),
  getFleetSpecController
);

// ─────────────────────────────────────────────────────────────────────────────
// ✨ Main Fleet CRUD Routes
// ─────────────────────────────────────────────────────────────────────────────

router.post(
  '/create',
  useAuth,
  reqValidator("createFleetSchema", 'body'),
  createFleetController
);
router.put(
  '/update/:id',
  useAuth,
  reqValidator("fleetIdSchema", 'params'),
  reqValidator("createFleetSchema", 'body'),
  updateFleetController
);
// get all fleets
router.post(
  '/all',
  useAuth,
  getAllFleetsController
);

router.post(
  '/get-specific',
  useAuth,
  reqValidator("getSpecificFleetSchema", 'body'),
  getFleetByIdController
);



router.delete(
  '/:id',
  useAuth,
  adminOnly(USER_ROLES?.ADMIN),
  reqValidator("fleetIdSchema", 'params'),
  deleteFleetController
);

module.exports = router;
