const { default: HttpStatus } = require('http-status');
const spaceTypeService = require('../../services/common/spaceType.service');
const pick = require('../../shared/core/utils/pick');
const catchAsync = require('../../shared/core/utils/catchAsync');
const BaseController = require('../base.controller');
class SpaceTypeController extends BaseController {
  constructor() {
    super(spaceTypeService)
  }
  getAll = catchAsync(async (req, res) => {
    const queryParams = pick(req.query, ['search', 'role', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const refFields = { los: ['title'] };
    const result = await this.service.getAll(queryParams, options, refFields);
    return this.sendSuccessResponse(res, HttpStatus.OK,result);

  })

}
module.exports = new SpaceTypeController();

