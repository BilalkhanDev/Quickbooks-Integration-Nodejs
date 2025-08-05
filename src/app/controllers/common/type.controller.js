const { default: HttpStatus } = require('http-status');
const catchAsync = require('../../../shared/core/utils/catchAsync');
const fleetTypeService = require('../../services/common/type.service');

exports.create = catchAsync(async (req, res) => {
  const data = await fleetTypeService.create(req.body);
  res.status(HttpStatus.CREATED).json(data);
})
exports.getAll =catchAsync(async (req, res) => {
    const data = await fleetTypeService.getAll();
    res.status(HttpStatus.OK).json(data);

})

exports.update = catchAsync(async (req, res) => {
    const data = await fleetTypeService.update(req.params.id, req.body);
    res.status(HttpStatus.OK).json(data);
 
})

exports.remove =catchAsync(async (req, res) => {
    await fleetTypeService.delete(req.params.id);
    res.status(HttpStatus.OK).json({ message: 'Deleted successfully' });
  
})

exports.bulkDelete = catchAsync( async (req, res) => {
    const result = await fleetTypeService.bulkDelete(req.body);
    res.status(HttpStatus.OK).json({ message: `${result.deletedCount} fleet types deleted.` });
 
})

