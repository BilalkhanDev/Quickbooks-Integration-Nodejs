const express = require('express');
const reqValidator = require('../../../shared/middleware/validate.middleware');
const router = express.Router();
const {create,update,getAll,getSingle,remove}=require("../../controllers/common/serviceArea.controller");
const { useAuth } = require('../../../shared/middleware/useAuth.middleware');
router
  .route('/')
  .post(useAuth,create)
  .get(useAuth,getAll);


router
  .route('/:id')
  .get(useAuth,getSingle)
  .patch(useAuth, update)
  .delete(useAuth,remove);

module.exports = router;
