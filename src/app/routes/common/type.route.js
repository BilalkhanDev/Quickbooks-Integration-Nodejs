const express = require('express');
const {
  create,
  remove,
  bulkDelete,
  update,
  getAll,
  getById
} = require('../controllers/typeController');

const { useAuth } = require('../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../shared/middleware/reqValidator.middleware');

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
