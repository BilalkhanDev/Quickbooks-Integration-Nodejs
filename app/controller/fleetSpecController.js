
const { updateFleetSpec, getFleetSpecService } = require('../services/fleetSpecService');

const getById = async (req, res) => {
  try {

    const Fleet = await getFleetSpecService(req.params.fleetId);
    res.status(200).json(Fleet);
  } catch (err) {
 
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { fleetId } = req.params;
    const data = req.body;
    const updatedFleet = await updateFleetSpec(fleetId, data);
    res.status(200).json(updatedFleet);
  } catch (err) {
 
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  update,
  getById
};
