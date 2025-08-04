const express = require('express');
const reqValidator = require('../../../shared/middleware/reqValidator.middleware');
const router = express.Router();
const {create,update,getAll,getSingle,remove}=require("../../controllers/common/serviceArea.controller");
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
router
  .route('/')
  .post(useAuth,reqValidator("ServiceAreaValidation","body"),create)
  .get(useAuth,getAll);


router
  .route('/:id')
  .get(useAuth,getSingle)
  .patch(useAuth,reqValidator("ServiceAreaValidation","body"), update)
  .delete(useAuth,remove);

module.exports = router;
