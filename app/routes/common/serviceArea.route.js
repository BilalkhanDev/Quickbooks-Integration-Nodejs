const express = require('express');
const reqValidator = require('../../middleware/reqValidator');
const router = express.Router();
const {create,update,getAll,getSingle,remove}=require("../../controller/common/serviceArea.controller");
const { useAuth } = require('../../middleware/useAuth');
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
