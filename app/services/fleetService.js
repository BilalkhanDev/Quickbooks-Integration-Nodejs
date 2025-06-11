const {
  createFleetDal,
  getAllFleetsDal,
  getFleetByIdDal,
  updateFleetDal,
  deleteFleetDal,
} = require('../dal/fleetDal');

const createFleet = async (data) => {
  return await createFleetDal(data);
};

const getAllFleets = async (query) => {
  const { page = 1, limit = 20, ...filter } = query;
  return await getAllFleetsDal(filter, parseInt(page), parseInt(limit));
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
};
