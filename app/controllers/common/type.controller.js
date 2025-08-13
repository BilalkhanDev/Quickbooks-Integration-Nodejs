const { default: HttpStatus } = require('http-status');
const catchAsync = require('../../shared/core/utils/catchAsync');
const fleetTypeService = require('../../services/common/type.service');
const BaseController = require('../base.controller');
class FleetTypeController extends BaseController {
    constructor() {
        super(fleetTypeService)
    }
    bulkDelete = catchAsync(async (req, res) => {
        const result = await this.service.bulkDelete(req.body);
        return this.sendSuccessResponse(res, HttpStatus.OK, "Success", result);
    })
}
module.exports = new FleetTypeController();



