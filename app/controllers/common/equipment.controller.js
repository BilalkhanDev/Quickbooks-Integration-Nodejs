const equipmentService = require('../../services/common/equipment.service');
const pick = require('../../shared/core/utils/pick');
const catchAsync = require('../../shared/core/utils/catchAsync');
const BaseController = require('../base.controller');

class EquipmentController extends BaseController {
  constructor() {
    super(equipmentService);
  }

  getAll = catchAsync(async (req, res) => {
  const queryParams = pick(req.query, ['search', 'role', 'isActive']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await this.service.getAll(queryParams, options);
  return this.sendSuccessResponse(res, HttpStatus.OK,"Succes", result);

})

}
module.exports = new EquipmentController();







