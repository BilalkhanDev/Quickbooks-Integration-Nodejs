const { default: HttpStatus } = require('http-status');
const pick = require('../../shared/core/utils/pick');
const fundingSourceService = require('../../services/common/fundingSource.service');
const catchAsync = require('../../shared/core/utils/catchAsync');
const BaseController = require('../base.controller');


class FundingSourceController extends BaseController {
  constructor() {
    super(fundingSourceService)
  }
  create = catchAsync(async (req, res) => {
    const result = await this.service.create(req);
    return this.sendSuccessResponse(res, HttpStatus.OK, "Succes", result);

  })
  getAll = catchAsync(async (req, res) => {
    const queryParams = pick(req.query, ['search', 'role', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await this.service.getAll(queryParams, options);
    return this.sendSuccessResponse(res, HttpStatus.OK, "Succes", result);

  })
}
module.exports = new FundingSourceController();



