
const express=require('express')

const customerController = require("../controllers/customer.controller");
const router = express.Router();


router
  .route('/')
  .post(customerController.create)

router
  .route('/all')
  .post(customerController.getAll)


module.exports = router;