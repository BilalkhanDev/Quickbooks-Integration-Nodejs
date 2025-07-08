const { getServiceEntryByIdDAL, updateServiceEntryDAL, getSingleServiceEntryByIdDAL } = require('../dal/serviceEntryDal');
const ServiceEntry = require('../models/serviceEntry');

// Create a new ServiceEntry
const createServiceEntryService = async (req) => {
  try {
    const newEntry = await ServiceEntry.create({
      ...req.body,
      photos: req.files?.photos?.map(file => file.filename) || [],
      documents: req.files?.documents?.map(file => file.filename) || []
    });
    return newEntry;
  } catch (err) {
    throw err;
  }
};

// Get ServiceEntry by fleetId
const getServiceEntryService = async (fleetId) => {
  if (!fleetId) {
    throw new Error('Fleet ID is required');
  }

  const entry = await getServiceEntryByIdDAL(fleetId);
  return entry;
};

const getSingleServiceEntryService = async (req) => {
  const { id } = req.params
  const entry = await getSingleServiceEntryByIdDAL(id);
  return entry;
};
// Update ServiceEntry by fleetId

const updateServiceEntryService = async (req) => {
  const { id } = req.params;
  const data = req.body;
  let photos = req.files?.photos?.map(file => file.filename);
  let documents = req.files?.documents?.map(file => file.filename);
  try {


    // Fetch the existing service entry to get the current photos and documents
    const existingServiceEntry = await ServiceEntry.findById(id);

    if (!existingServiceEntry) {
      return res.status(404).json({ message: "Service entry not found" });
    }

    // If photos or documents are not provided, retain the existing ones
    photos = photos && photos.length > 0 ? photos : existingServiceEntry.photos;
    documents = documents && documents.length > 0 ? documents : existingServiceEntry.documents;

    // Add the photos, documents, and other data to the update object
    const updatedData = { ...data, photos, documents };
    const updatedServiceEntry = await updateServiceEntryDAL(id, updatedData);
    return updatedServiceEntry;
  } catch (error) {
    throw new Error(`Error updating service entry: ${error.message}`);
  }
};

module.exports = {
  createServiceEntryService,
  getServiceEntryService,
  updateServiceEntryService,
  getSingleServiceEntryService
};
