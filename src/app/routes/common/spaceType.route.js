const express = require('express');
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
const reqValidator = require('../../../shared/middleware/validate.middleware');
const spaceTypeController=require('../../controllers/common/spacetype.controller')
const getSpaceTypeValidation = require('../../../shared/validation/common/spaceType.schema');

const router = express.Router();

router
    .route('/')
    .post(useAuth, reqValidator(getSpaceTypeValidation,'create') ,spaceTypeController.create)
    .get(useAuth, spaceTypeController.getAll);

router
    .route('/:id')
    .get(useAuth, reqValidator(getSpaceTypeValidation,'getById'),spaceTypeController.getSingle)
    .patch(useAuth,reqValidator(getSpaceTypeValidation,'update'), spaceTypeController.update)
    .delete(useAuth,reqValidator(getSpaceTypeValidation,'getById'),spaceTypeController.remove);

module.exports = router;
