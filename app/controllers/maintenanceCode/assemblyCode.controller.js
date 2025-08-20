
const assemblyCodeService = require("../../services/maintenanceCode/assemblyCode.service");
const catchAsync = require("../../shared/core/utils/catchAsync");
const BaseController = require("../base.controller");
const { default: HttpStatus } = require('http-status');


class AssemblyCodeController extends BaseController {
  constructor() {
    super(assemblyCodeService);
    }
    getAll = catchAsync(async (req, res) => {
        const { systemId } = req.params
        const data = await this.service.getAll(systemId);
        return this.sendSuccessResponse(res, HttpStatus.OK, data);

    })
}

module.exports = new AssemblyCodeController();
