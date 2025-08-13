// controllers/issue.controller.js
const HttpStatus = require('http-status').default;
const BaseController = require('./base.controller');
const issueService = require('../services/issue.service');
const catchAsync = require('../shared/core/utils/catchAsync');

class IssueController extends BaseController {
  constructor() {
    super(issueService);
  }
  getIssuesByServiceId = catchAsync(async (req, res) => {
    const issues = await this.service.getByServiceId(req.params.serviceId);
    return this.sendSuccessResponse(res,  HttpStatus.OK,'Issues by service ID fetched', issues);
  });

}

module.exports = new IssueController();
