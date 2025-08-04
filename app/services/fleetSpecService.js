const { updateFleetSpecAndSubSpecs, getFleetSpecs } = require('../dal/fleetSpecDal');

const updateFleetSpec = async (fleetId, updateData) => {
  return await updateFleetSpecAndSubSpecs(fleetId, updateData);
};
const getFleetSpecService=async (fleetId)=>{
  return await getFleetSpecs(fleetId);
}
module.exports = {
  updateFleetSpec,
  getFleetSpecService
};
