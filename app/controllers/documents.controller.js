const { default: HttpStatus } = require('http-status');
const catchAsync = require('../shared/core/utils/catchAsync');
const documentsService = require('../services/documents.service');
const pick = require('../shared/core/utils/pick');
const BaseController = require('./base.controller');

class DocumentsController extends BaseController {
  constructor() {
    super(documentsService);
  }

  add = catchAsync(async (req, res) => {
    const doc = await this.service.create(req);
    this.sendSuccessResponse(res, HttpStatus.CREATED, doc);
  });

  getAll = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const queryParams = pick(req.query, ['search', 'documentType']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const docs = await this.service.getAll(queryParams, options, userId);
    this.sendSuccessResponse(res, HttpStatus.OK, docs);
  });
}


module.exports = new DocumentsController();
