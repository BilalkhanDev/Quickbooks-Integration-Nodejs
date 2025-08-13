const catchAsync = require('../../shared/core/utils/catchAsync');
const fuelTypeService = require('../../services/common/fuelType.service');
const BaseController = require('../base.controller');


class FuelTypeController extends BaseController {
    constructor() {
        super(fuelTypeService)
    }
    bulkDelete = catchAsync(async (req, res) => {
        const result = await this.service.bulkDelete(value);
        return this.sendSuccessResponse(res, HttpStatus.OK, "Succes", result);


    });
}
module.exports = new FuelTypeController();
