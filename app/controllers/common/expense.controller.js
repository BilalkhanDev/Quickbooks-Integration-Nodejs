const catchAsync = require('../../shared/core/utils/catchAsync');
const service = require('../../services/common/expense.service');
const BaseController = require('../base.controller');
const expenseService = require('../../services/common/expense.service');


class ExpenseController extends BaseController {
  constructor() {
    super(expenseService)
  }

  bulkRemove = catchAsync(async (req, res) => {
    const result = await this.service.bulkRemove(req.body);
    return this.sendSuccessResponse(res, HttpStatus.OK, "Succes", result);

  });
}
module.exports = new ExpenseController();









