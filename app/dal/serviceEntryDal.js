const ServiceEntry = require('../models/serviceEntry');

// Create a new ServiceEntry
const createServiceEntryDAL = async (data) => {
  try {
    const newServiceEntry = new ServiceEntry(data);
    await newServiceEntry.save();
    return newServiceEntry;
  } catch (error) {
    console.log("Error", error)
    throw new Error("Error saving service entry");
  }
};

// Get ServiceEntry by ID
const getServiceEntryByIdDAL = async (fleetId) => {
  try {
    const serviceEntry = await ServiceEntry.findOne({fleetId:fleetId}).populate('vendor').populate('issues');
    return serviceEntry;
  } catch (error) {
    throw new Error("Error fetching service entry");
  }
};

module.exports = {
  createServiceEntryDAL,
  getServiceEntryByIdDAL
};
