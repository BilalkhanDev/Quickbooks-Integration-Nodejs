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

    return res.status(200).json(response.data);
  } catch (error) {
    
    return res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Error fetching funding sources",
    });
  }
};

// Service Areas
const serviceAreas = async (req, res) => {
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
    return res.status(200).json(response.data);
  } catch (error) {

    return res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Error fetching Service Area",
    });
  }
};

// Space Types
const spaceTypes = async (req, res) => {
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

      return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Error fetching Space Types",
    });
  }
};

// Equipments
const equipments = async (req, res) => {
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
     return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Error fetching equipment",
    });
  }
};

// Level of Service
const los = async (req, res) => {
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

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error:
        error?.response?.data?.message ||
        error.message ||
        "Error fetching Los",
    });
  }
};

module.exports = {
  fundingSource,
  serviceAreas,
  spaceTypes,
  equipments,
  los,
};
