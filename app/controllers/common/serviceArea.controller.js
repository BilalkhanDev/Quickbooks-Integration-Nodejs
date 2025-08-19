const { default: HttpStatus } = require('http-status');
const serviceAreaService = require('../../services/common/serviceArea.service');
const pick = require('../../shared/core/utils/pick');
const BaseController = require('../base.controller');
const catchAsync = require('../../shared/core/utils/catchAsync');
class ServiceAreaController extends BaseController {
  constructor() {
    super(serviceAreaService)
  }
  getAll = catchAsync(async (req, res) => {

    const queryParams = pick(req.query, ['search', 'role', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await this.service.getAll(queryParams, options);
    return this.sendSuccessResponse(res, HttpStatus.OK, result);

  })
}
module.exports = new ServiceAreaController();




