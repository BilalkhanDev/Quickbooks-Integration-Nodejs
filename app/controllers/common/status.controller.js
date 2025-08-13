const { default: HttpStatus } = require('http-status');
const catchAsync = require('../../shared/core/utils/catchAsync');
const fleetStatusService = require('../../services/common/fleetStatus.service');
const BaseController = require('../base.controller');

class StatusController extends BaseController {
  constructor() {
    super(fleetStatusService)
  }

  bulkRemove = catchAsync(async (req, res) => {

    const ids = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'No IDs provided for deletion.' });
    }
    const result = await this.service.bulkDelete(ids);
     return this.sendSuccessResponse(res, HttpStatus.OK, "Success",result);

  })

}
module.exports = new StatusController();




