const express = require('express');
const { useAuth } = require('../../middleware/useAuth');
const reqValidator = require('../../middleware/reqValidator');
const router = express.Router();
const { create, getAll, getSingle, update, remove } = require("../../controller/common/equipment.controller")

router
    .route('/')
    .post(useAuth, reqValidator("equipmentSchema","body"), create)
    .get(useAuth, getAll);


router
    .route('/:id')
    .get(useAuth, getSingle)
    .patch(useAuth, reqValidator("equipmentSchema","body"), update)
    .delete(useAuth, remove);

module.exports = router;
