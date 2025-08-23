const express = require('express');
const { useAuth } = require('../../middleware/useAuth.middleware');
const spaceTypeController=require('../../controllers/common/spacetype.controller');
const validate = require('../../middleware/validate.middleware');
const spaceTypeSchema = require('../../validation/common/spaceType.schema');

const router = express.Router();

router
    .route('/')
    .post(useAuth,validate(spaceTypeSchema.create()),spaceTypeController.create)
    .get(useAuth,validate(spaceTypeSchema.getAll()), spaceTypeController.getAll);

router
    .route('/:id')
    .get(useAuth,validate(spaceTypeSchema.getById()),spaceTypeController.getById)
    .patch(useAuth,validate(spaceTypeSchema.update()), spaceTypeController.update)
    .delete(useAuth,validate(spaceTypeSchema.delete()),spaceTypeController.delete);

module.exports = router;
