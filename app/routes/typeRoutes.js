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

router.put(
  '/:id',
  useAuth,
  reqValidator('generiIdSchema', 'params'),
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
  reqValidator('generiIdSchema', 'params'),
  remove
);

module.exports = router;
