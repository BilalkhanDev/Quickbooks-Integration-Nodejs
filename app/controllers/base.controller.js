// controllers/base.controller.js
const { default: HttpStatus } = require('http-status');
const catchAsync = require('../shared/core/utils/catchAsync');

class BaseController {
  constructor(service) {
    this.service = service; 
  }
  create = catchAsync(async (req, res) => {
    const data = await this.service.create(req.body);

     return this.sendSuccessResponse(res, HttpStatus.OK, data);
  });

  
  getById= catchAsync(async (req, res) => {
    const data = await this.service.getById(req.params.id);
    if (!data) {
      return this.sendErrorResponse(res, HttpStatus.NOT_FOUND, 'Not found');
    }
   return this.sendSuccessResponse(res, HttpStatus.OK, data);
  });

  getAll = catchAsync(async (req, res) => {
    const data = await this.service.getAll();
     return this.sendSuccessResponse(res, HttpStatus.OK, "Fetch Success", data);
  });

  update = catchAsync(async (req, res) => {
    const data = await this.service.update(req.params.id, req.body);
    if (!data) {
      return this.sendErrorResponse(res, HttpStatus.NOT_FOUND, 'Not found');
    }
    return this.sendSuccessResponse(res, HttpStatus.OK, data);
  });

  delete = catchAsync(async (req, res) => {
    const data = await this.service.delete(req.params.id);
    if (!data) {
      return this.sendErrorResponse(res, HttpStatus.NOT_FOUND, 'Not found');
    }
    return this.sendSuccessResponse(res, HttpStatus.OK, data);
  });
   sendSuccessResponse(res, statusCode, message="Success", data = null) {
    res.status(statusCode).json({message,data});
  }

  sendErrorResponse(res, statusCode, message) {
    res.status(statusCode).json({ error: message });
  }

  
}

module.exports = BaseController;
