const { updateFleetSpec } = require('../services/fleetSpecService');

const update = async (req, res) => {
  try {
    const { id: fleetId } = req.params;
    const data = req.body;

    const updatedFleet = await updateFleetSpec(fleetId, data);
    res.status(200).json(updatedFleet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  update
};
