const {
  createFleetDal,
  getAllFleetsDal,
  getFleetByIdDal,
  updateFleetDal,
  deleteFleetDal,
  fetchFleetSpecs,
} = require('../dal/fleetDal');

const createFleet = async (data) => {
  return await createFleetDal(data);
};

const getAllFleets = async (req) => {
  const { page = 1, limit = 20, ...filter } = req.query;
  const {token}=req.body
  return await getAllFleetsDal(token, filter, parseInt(page), parseInt(limit));
};

const getFleetSpec = async (req) => {
  const {fleetId} = req.params;

  return await fetchFleetSpecs(fleetId);
};
const getFleetById = async (id) => {
  return await getFleetByIdDal(id);
};

const updateFleet = async (id, data) => {
  return await updateFleetDal(id, data);
};

const deleteFleet = async (id) => {
  return await deleteFleetDal(id);
};

module.exports = {
  createFleet,
  getAllFleets,
  getFleetById,
  updateFleet,
  deleteFleet,
  getFleetSpec
};
