const axios = require("axios");



// Funding Source
const fundingSource = async (req, res) => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      `${process.env.FLEET_URL}/cooperates?accountStatus=active`,
      {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("ERROR Fetching FS:", error?.response?.data || error.message);
    throw new Error(
      error?.response?.data || error.message || "Error fetching funding sources"
    );
  }
};

// Service Areas
const serviceAreas = async (req) => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      `${process.env.FLEET_URL}/serviceareas?status=active`,
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
      "ERROR Fetching Service Area:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data || error.message || "Error fetching service areas"
    );
  }
};

// Space Types
const spaceTypes = async (req) => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      `${process.env.FLEET_URL}/spacetypes?status=active`,
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
      "ERROR Fetching Space Types:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data || error.message || "Error fetching space types"
    );
  }
};

// Equipments
const equipments = async (req) => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      `${process.env.FLEET_URL}/equipments?isAddon=false`,
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
      "ERROR Fetching Equipments:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data || error.message || "Error fetching equipments"
    );
  }
};

// Level of Service
const los = async (req) => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      `${process.env.FLEET_URL}/levelofservices?status=active`,
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
      "ERROR Fetching LOS:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data || error.message || "Error fetching LOS"
    );
  }
};

module.exports = {
  fundingSource,
  serviceAreas,
  spaceTypes,
  equipments,
  los,
};
