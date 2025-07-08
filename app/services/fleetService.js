const {
  createFleetDal,
  getAllFleetsDal,
  getFleetByIdDal,
  updateFleetDal,
  deleteFleetDal,
  fetchFleetSpecs,
} = require("../dal/fleetDal");

const createFleet = async (data) => {
  const { token, ...payload } = data;
  return await createFleetDal(payload, token);
};

const getAllFleets = async (req) => {
  const { page = 1, limit = 20, ...filter } = req.query;
  const { token } = req.body;

  return await getAllFleetsDal(token, filter, parseInt(page), parseInt(limit));
};

const getFleetById = async (data) => {
  const { token, id } = data;
  return await getFleetByIdDal(id, token);
};

const updateFleet = async (id, data) => {
  const { token, ...payload } = data;
  return await updateFleetDal(id, payload, token);
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
