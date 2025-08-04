const { getServiceEntryByIdDAL, updateServiceEntryDAL, getSingleServiceEntryByIdDAL } = require('../../dal/serviceEntryDal');
const ServiceEntry = require('../models/serviceEntry.model');

// Create a new ServiceEntry
const createServiceEntryService = async (req) => {
  try {
    const documentUrls = req?.s3Urls || [];

    const newEntry = await ServiceEntry.create({
      ...req.body,
      documents: documentUrls,
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

const updateServiceEntryService = async (req, res) => {
  const { id } = req.params;
  const { existingDocuments } = req.body;
  let existingDocsArray = [];
  if (existingDocuments) {
    try {
      existingDocsArray = JSON.parse(existingDocuments);
    } catch (err) {
      console.error("Invalid JSON in existingDocuments");
    }
  }
  const uploadedDocs =  req?.s3Urls || [];


  const finalDocuments = [...existingDocsArray, ...uploadedDocs];

  const updated = await ServiceEntry.findByIdAndUpdate(
    id,
    {
      ...req.body,
      documents: finalDocuments,
    },
    { new: true }
  );

  return updated;
};


module.exports = {
  createServiceEntryService,
  getServiceEntryService,
  updateServiceEntryService,
  getSingleServiceEntryService
};
