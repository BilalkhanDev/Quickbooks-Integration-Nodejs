const { updateFleetSpecAndSubSpecs } = require('../dal/fleetSpecDal');

const updateFleetSpec = async (fleetId, updateData) => {
  return await updateFleetSpecAndSubSpecs(fleetId, updateData);
};

module.exports = {
  updateFleetSpec
};
