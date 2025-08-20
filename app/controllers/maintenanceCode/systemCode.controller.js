const categoryCodeService = require("../../services/maintenanceCode/systemCode.service");
const catchAsync = require("../../shared/core/utils/catchAsync");
const BaseController = require("../base.controller");
const { default: HttpStatus } = require('http-status');


class SystemCodeController extends BaseController {
  constructor() {
    super(categoryCodeService);
    }
    getAll = catchAsync(async (req, res) => {
        const { categoryId } = req.params
        const data = await this.service.getAll(categoryId);
        return this.sendSuccessResponse(res, HttpStatus.OK, data);

    })
}

module.exports = new SystemCodeController();
