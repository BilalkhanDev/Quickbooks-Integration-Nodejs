const { default: mongoose } = require('mongoose');
const axios = require("axios")
const Fleet = require('../models/fleet');

const createFleetDal = async (data) => {
  return await Fleet.create(data);
};

const getAllFleetsDal = async (token) => {
  try {
    const fleetResponse = await axios.get(`${process.env.FLEET_URL}`, {
      headers: { Authorization: `JWT ${token}` }
    });

    const fleets = fleetResponse.data;

    if (!Array.isArray(fleets)) throw new Error('Fleet data is not an array');

    const fleetIds = fleets.map(fleet => fleet._id);
    console.log("Fleet IDs:", fleetIds);

    // 2. Fetch related data (commented for now)
    /*
    const [modifications, specifications, assignments] = await Promise.all([
      Promise.all(fleetIds.map(id => fetch(`/api/modifications/${id}`).then(res => res.json()))),
      Promise.all(fleetIds.map(id => fetch(`/api/specifications/${id}`).then(res => res.json()))),
      Promise.all(fleetIds.map(id => fetch(`/api/assignments/${id}`).then(res => res.json())))
    ]);

    // 3. Combine all data
    const enrichedFleets = fleets.map((fleet, index) => ({
      ...fleet,
      modification: modifications[index],
      specification: specifications[index],
      assignment: assignments[index]
    }));

    return enrichedFleets;
    */

    return fleets;

  } catch (error) {
    console.error('Failed to fetch fleet details:', error.message);
    return [];
  }
};



const getFleetByIdDal = async (id) => {
  return await Fleet.findById(id).populate('assigned_driver', 'username email');
};

const updateFleetDal = async (id, data) => {
  return await Fleet.findByIdAndUpdate(id, data, { new: true }).populate('assigned_driver', 'username email');
};

const deleteFleetDal = async (id) => {
  return await Fleet.findByIdAndDelete(id);
};

module.exports = {
  createFleetDal,
  getAllFleetsDal,
  getFleetByIdDal,
  updateFleetDal,
  deleteFleetDal,
};


