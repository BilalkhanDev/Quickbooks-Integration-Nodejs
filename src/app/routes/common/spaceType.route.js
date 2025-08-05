const express = require('express');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../../shared/middleware/validate.middleware');
const { create, getAll, getSingle, remove, update } = require("../../controllers/common/spacetype.controller")

const router = express.Router();

router
    .route('/')
    .post(useAuth, create)
    .get(useAuth, getAll);

router
    .route('/:id')
    .get(useAuth, getSingle)
    .patch(useAuth, update)
    .delete(useAuth, remove);

module.exports = router;
