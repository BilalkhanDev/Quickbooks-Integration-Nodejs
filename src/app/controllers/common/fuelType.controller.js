const catchAsync = require('../../shared/core/utils/catchAsync');
const fuelTypeService = require('../../services/common/fuelType.service');


exports.create = catchAsync(async (req, res) => {
    const fuelType = await fuelTypeService.create(value);
    res.status(201).json(fuelType);

});

exports.getAll = catchAsync(async (req, res) => {
    const data = await fuelTypeService.getAll();
    res.json(data);
 
});

exports.update = catchAsync(async (req, res) => {
    const id = req.params.id;
    const updated = await fuelTypeService.update(id, value);
    res.json(updated);
 
});

exports.remove = catchAsync(async (req, res) => {
    const id = req.params.id;
    await fuelTypeService.delete(id);
    res.json({ message: 'Deleted successfully' });
} )

exports.bulkDelete = catchAsync(async (req, res) => {
    await fuelTypeService.bulkDelete(value);
    res.json({ message: 'Bulk delete successful' });
 
});
