const { updateFleetSpecAndSubSpecs, getFleetSpecs } = require('../dal/fleetSpecDal');

const updateFleetSpec = async (fleetId, updateData) => {
  return await updateFleetSpecAndSubSpecs(fleetId, updateData);
};

const getFleetSpecService=async (id)=>{
 
  return await getFleetSpecs(id);

}
module.exports = {
  updateFleetSpec,
  getFleetSpecService
};
