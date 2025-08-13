const { default: HttpStatus } = require('http-status');
const losService = require("../../services/common/los.service");
const pick = require('../../shared/core/utils/pick');
const catchAsync = require('../../shared/core/utils/catchAsync');
const BaseController = require('../base.controller');
class LosController extends BaseController {
    constructor() {
        super(losService);
    }
    getAll = catchAsync(async (req, res) => {
        const queryParams = pick(req.query, ['search', 'role', 'isActive']);
        const options = pick(req.query, ['sortBy', 'limit', 'page']);
        const result = await this.service.getAll(queryParams, options);
        return this.sendSuccessResponse(res, HttpStatus.OK,"Succes", result);

    });

}
module.exports = new LosController();


