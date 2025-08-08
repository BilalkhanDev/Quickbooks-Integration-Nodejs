const { default: HttpStatus } = require('http-status');
const catchAsync = require('../shared/core/utils/catchAsync'); // Optional but recommended
const documentsService = require('../services/documents.service');
const pick = require('../shared/core/utils/pick');

exports.add = catchAsync(async (req, res) => {
  const doc = await documentsService.add(req);
  console.log("Doc",doc)
  res.status(HttpStatus.CREATED).json(doc);
});

exports.getAll = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const queryParams = pick(req.query, ['search', 'documentType']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const docs = await documentsService.getAll(queryParams, options, userId);
    res.status(HttpStatus.OK).json(docs);
});




