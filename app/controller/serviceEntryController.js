const { createServiceEntryService, getServiceEntryService, updateServiceEntryService, getSingleServiceEntryService } = require('../services/serviceEntryService');

// Create a ServiceEntry
const createServiceEntry = async (req, res) => {
  try {
  
    const newServiceEntry = await createServiceEntryService(req);
    return res.status(201).json({
      message: "Service entry created successfully!",
      data: newServiceEntry
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

// Get ServiceEntry by fleetId
const getServiceEntryByFleetId = async (req, res) => {
  try {
    const { fleetId } = req.params;
    const serviceEntry = await getServiceEntryService(fleetId);

    if (!serviceEntry) {
      return res.status(404).json({ message: "Service entry not found" });
    }
    return res.status(200).json(serviceEntry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
const getServiceById = async (req, res) => {
  try {
    const serviceEntry = await getSingleServiceEntryService(req);

    if (!serviceEntry) {
      return res.status(404).json({ message: "Service entry not found" });
    }
    return res.status(200).json(serviceEntry);
  } catch (error) {
    console.error("Error:", error); // This will help trace any errors that occur in the try block
    return res.status(500).json({ error: error.message });
  }
};

// Update ServiceEntry by fleetId

const updateServiceEntry = async (req, res) => {
  try {

    const updatedServiceEntry = await updateServiceEntryService(req,res);

    return res.status(200).json({
      message: "Service entry updated successfully!",
      data: updatedServiceEntry
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createServiceEntry,
  getServiceEntryByFleetId,
  updateServiceEntry,
  getServiceById
};
