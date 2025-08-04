const express = require('express');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../../shared/middleware/reqValidator.middleware');
const { create, getAll, getSingle, remove, update } = require("../../controllers/common/spacetype.controller")

const router = express.Router();

router
    .route('/')
    .post(useAuth, reqValidator("spaceTypeSchema","body"), create)
    .get(useAuth, getAll);

router
    .route('/:id')
    .get(useAuth, getSingle)
    .patch(useAuth, reqValidator("spaceTypeSchema","body"), update)
    .delete(useAuth, remove);

module.exports = router;
