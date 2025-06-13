const { createServiceEntryService, getServiceEntryService } = require('../services/serviceEntryService');

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

const getServiceEntryById = async (req, res) => {
  try {
    const { fleetId} = req.params;

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
module.exports={
    createServiceEntry,
    getServiceEntryById
}