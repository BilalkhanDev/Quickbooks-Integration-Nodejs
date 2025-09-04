// controllers/auth.controller.js
const catchAsync = require('../shared/core/utils/catchAsync');
const { default: HttpStatus } = require('http-status');
const BaseController = require('./base.controller');  
const ApiError = require('../shared/core/exceptions/ApiError');
const tokenProvider = require('../shared/security/tokenProvider');
const pick = require('../shared/core/utils/pick');
const customerService = require('../services/customer.service');

class CustomerController extends BaseController {
  constructor() {
    super(customerService);  
  }

 create=catchAsync(async (req,res)=>{
    const data=await this.service.create(req.body)
    return this.sendSuccessResponse(res,HttpStatus.CREATED,data)
 })

 getAll=catchAsync(async (req,res)=>{
    const data=await this.service.getAll(req.body)
    return this.sendSuccessResponse(res,HttpStatus.CREATED,data)
 })
}

module.exports = new CustomerController();
