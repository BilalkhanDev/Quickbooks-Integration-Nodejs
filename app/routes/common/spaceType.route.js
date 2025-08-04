const express = require('express');
const { useAuth } = require('../../middleware/useAuth');
const reqValidator = require('../../middleware/reqValidator');
const { create, getAll, getSingle, remove, update } = require("../../controller/common/spacetype.controller")

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
