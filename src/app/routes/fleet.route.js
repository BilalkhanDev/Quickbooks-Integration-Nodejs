const express = require('express');
const { USER_ROLES } = require('../../shared/constants/role');
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controllers/fleet.controller');
const { reqValidator, useAuth } = require('../../shared/middleware');
const { adminOnly } = require('../../shared/middleware/useAuth.middleware');

const router = express.Router();
router
  .route('/')
  .post(useAuth,reqValidator("fleetSchema", 'body'), create)
  .get(useAuth, getAll);

router
  .route('/:id')
  .put(useAuth, reqValidator("fleetIdSchema", 'params'), reqValidator("fleetSchema", 'body'), update)
  .patch(useAuth, reqValidator("fleetIdSchema", 'params'), reqValidator("fleetDriverSchema", 'body'), update)
  .get(useAuth, reqValidator("fleetIdSchema", 'params'), getById)
  .delete(useAuth, adminOnly(USER_ROLES?.ADMIN), reqValidator("fleetIdSchema", 'params'), remove);


module.exports = router;
