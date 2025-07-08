const { default: mongoose } = require("mongoose");
const Fleet = require("../models/fleet");
const axios = require("axios");
const FleetSpec = require("../models/specfication/index");

const createFleetDal = async (data) => {
  return await Fleet.create(data);
};

const getAllFleetsDal = async (token) => {
  try {
    
    const fleetResponse = await axios.get(`${process.env.FLEET_URL}`, {
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
const fetchFleetSpecs = async (fleetId, token) => {
  try {
    let fleetBasicDetails = null;

    const fleetResponse = await axios.get(`${process.env.FLEET_URL}`, {
      headers: { Authorization: `JWT ${token}` },
    });

    const fleets = fleetResponse.data;

    // 3. Get the specific fleet's basic details from API response
    fleetBasicDetails = fleets.find(
      (fleet) => (fleet.id || fleet?._id) === fleetId
    );

    if (!fleetBasicDetails) {
      console.warn(`⚠️ Fleet with ID ${fleetId} not found in external API.`);
    } else {
      console.log("✅ Found fleet basic details from Server 1");
    }

    // 4. Fetch fleet specifications from your DB
    const specs = await FleetSpec.find({ fleetId })
      .populate("engine")
      .populate("wheel")
      .populate("transmission")
      .populate("weight")
      .populate("fuelEconomy");

    const fleetSpec = specs.length ? specs[0].toJSON() : null;

    // 5. Return combined object
    return {
      fleetId,
      basicDetails: fleetBasicDetails || null,
      specification: fleetSpec,
    };
  } catch (error) {
    console.error("❌ Error in fetchFleetSpecs:", error.message);
    throw new Error("Error fetching fleet specifications and details");
  }
};

const getFleetByIdDal = async (id) => {
  return await Fleet.findById(id).populate("assigned_driver", "username email");
};

const updateFleetDal = async (id, data) => {
  return await Fleet.findByIdAndUpdate(id, data, { new: true }).populate(
    "assigned_driver",
    "username email"
  );
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
  fetchFleetSpecs,
};
