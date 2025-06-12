const express = require('express');
const {
  create,
  remove,
  bulkDelete,
  update,
  getAll,
  getById
} = require('../controller/typeController');

const { useAuth } = require('../middleware/useAuth');
const reqValidator = require('../middleware/reqValidator');

const router = express.Router();

router.post(
  '/',
  useAuth,
  reqValidator('createFleetTypeSchema', 'body'),
  create
);

router.get(
  '/',
  useAuth,
  getAll
);

// router.get(
//   '/:id',
//   useAuth,
//   reqValidator('fleetTypeIdSchema', 'params'),
//   getById
// );

router.put(
  '/:id',
  useAuth,
  reqValidator('fleetTypeIdSchema', 'params'),
  reqValidator('updateFleetTypeSchema', 'body'),
  update
);

router.delete('/delete',
  useAuth,
  reqValidator('bulkDeleteFleetTypeSchema', 'body'),
  bulkDelete
);

router.delete('/:id',
  useAuth,
  reqValidator('fleetTypeIdSchema', 'params'),
  remove
);

module.exports = router;
