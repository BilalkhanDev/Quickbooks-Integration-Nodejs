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
  adminOnly(USER_ROLES?.ADMIN),
  reqValidator("createFleetSchema", 'body'),
  createFleetController
);

router.post(
  '/all',
  useAuth,
  getAllFleetsController
);

router.get(
  '/:id',
  useAuth,
  reqValidator("fleetIdSchema", 'params'),
  getFleetByIdController
);

router.put(
  '/:id',
  useAuth,
  adminOnly(USER_ROLES?.ADMIN),
  reqValidator("fleetIdSchema", 'params'),
  reqValidator("updateFleetSchema", 'body'),
  updateFleetController
);

router.delete(
  '/:id',
  useAuth,
  adminOnly(USER_ROLES?.ADMIN),
  reqValidator("fleetIdSchema", 'params'),
  deleteFleetController
);

module.exports = router;
