// controllers/vendor.controller.js

const HttpStatus = require('http-status').default;
const catchAsync = require('../shared/core/utils/catchAsync');
const pick = require('../shared/core/utils/pick');
const vendorService = require('../services/vendor.service');
const BaseController = require('./base.controller');

class VendorController extends BaseController {
  constructor() {
    super(vendorService);
  }
create = catchAsync(async (req, res) => {
    const result = await this.service.create(req);
    return this.sendSuccessResponse(res, HttpStatus.OK, result);

  })
 
  update = catchAsync(async (req, res) => {
          const result = await this.service.update(req.params.id,req.body);
          return this.sendSuccessResponse(res, HttpStatus.OK, result);
  
  });
  getAll = catchAsync(async (req, res) => {
    const queryParams = pick(req.query, ['search', 'classification', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);

    const paginatedData = await this.service.getAll(queryParams, options);

    return this.sendSuccessResponse(res, HttpStatus.OK, paginatedData);
  });

  bulkDelete = catchAsync(async (req, res) => {
    const ids = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return this.sendErrorResponse(res, HttpStatus.BAD_REQUEST, 'No IDs provided for deletion.');
    }

    await this.service.bulkDelete(ids);

    return this.sendSuccessResponse(res,HttpStatus.OK, 'Bulk delete successful');
  });

  // create, getById, update, remove are inherited from BaseController
}

module.exports = new VendorController();
