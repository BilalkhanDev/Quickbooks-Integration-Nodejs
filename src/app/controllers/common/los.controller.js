const { default: HttpStatus } = require('http-status');
const losService=require("../../services/common/los.service");
const pick = require('../../../shared/core/utils/pick');
const catchAsync = require('../../../shared/core/utils/catchAsync');

exports.create = catchAsync(async (req, res) => {
    const result = await losService.create(req);
    res.status(HttpStatus.CREATED).send(result);
 
})

exports.getSingle = catchAsync(async (req, res) => {
    const result= await losService.getSingle(req.params.id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).json({ error: 'LOS not found' });
    }
    res.status(HttpStatus.OK).send(result);
});

exports.getAll =catchAsync( async (req, res) => {

    const queryParams = pick(req.query, ['search', 'role', 'isActive']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await losService.getAll(queryParams, options);
    res.status(HttpStatus.OK).send(result);

});

exports.update =catchAsync( async (req, res) => {
    const result = await losService.update(req);
    res.send(result);
 
});

exports.remove = catchAsync(async (req, res) => {
    const result=await losService.remove(req.params.id);
    res.status(HttpStatus.OK).send(result);
 
});
