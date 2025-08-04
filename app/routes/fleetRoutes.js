const express = require('express');
const { useAuth, adminOnly } = require('../middleware/useAuth');
const { USER_ROLES } = require('../constants/role');
const reqValidator = require('../middleware/reqValidator');

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controller/fleetController');

const router = express.Router();
router
  .route('/')
  .post(useAuth, reqValidator("fleetSchema", 'body'), create)
  .get(useAuth, getAll);

router
  .route('/:id')
  .put(useAuth, reqValidator("fleetIdSchema", 'params'), reqValidator("fleetSchema", 'body'), update)
  .patch(useAuth, reqValidator("fleetIdSchema", 'params'), reqValidator("fleetDriverSchema", 'body'),update)
  .get(useAuth,reqValidator("fleetIdSchema", 'params'),getById)
  .delete(useAuth, adminOnly(USER_ROLES?.ADMIN), reqValidator("fleetIdSchema", 'params'), remove);


module.exports = router;
