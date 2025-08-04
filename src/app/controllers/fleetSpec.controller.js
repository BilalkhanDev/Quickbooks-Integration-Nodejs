
const { default: HttpStatus } = require('http-status');
const catchAsync = require('../../shared/core/utils/catchAsync');


exports.getById =catchAsync(async (req, res) => {
    const Fleet = await get(req.params.fleetId);
    res.status(HttpStatus.OK).json(Fleet); 
})

exports.update = async (req, res) => {
  try {
    const { fleetId } = req.params;
    const data = req.body;
    const updatedFleet = await (fleetId, data);
    res.status(200).json(updatedFleet);
  } catch (err) {
 
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  update,
  getById
};
