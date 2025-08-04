const { default: mongoose } = require("mongoose");
const Fleet = require("../models/fleet");
const axios = require("axios");

const create = async (data) => {
    const newFleet = new Fleet(data);
    await newFleet.save();
    return newFleet;
  
};
const getAllFleetsDal = async (token) => {
  try {
    const fleetResponse = await axios.get(`${process.env.FLEET_URL}/fleets`, {
      headers: { Authorization: `JWT ${token}` },
    });

    const fleets = fleetResponse.data;

    if (!Array.isArray(fleets)) {
      throw new Error("Fleet data is not an array");
    }

    return fleets;
  } catch (error) {
    console.error("❌ Error in fetchFleetsAndStoreIdsDal:", error.message);
    return [];
  }
};

const getFleetByIdDal = async (id, token) => {
  try {
    const response = await axios.get(
      `${process.env.FLEET_URL}/fleets/${id}`,

      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "ERROR Fetching Fleet:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data || error.message || "Error Updataing  fleet"
    );
  }
};
const updateFleetDal = async (id, data, token) => {
  try {
    const response = await axios.put(`${process.env.FLEET_URL}/fleets/${id}`, data, {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "ERROR Updating Fleet:",
      error?.response?.data || error.message
    );
    throw new Error("Error Updataing  fleet");
  }
};
const deleteFleetDal = async (id) => {
  return await Fleet.findByIdAndDelete(id);
};

const fleetDal = {
  create,
  getAllFleetsDal,
  getFleetByIdDal,
  updateFleetDal,
  deleteFleetDal,

};
module.exports=fleetDal
