const fs = require('fs');
const path = require('path');
const ServiceEntry = require('../models/serviceEntry');
const { getServiceEntryByIdDAL } = require('../dal/serviceEntryDal');

const createServiceEntryService = async (req) => {
  const uploadDir = path.join(__dirname, '../../public/uploads');

  const photos = req.files?.photos?.map(file => file.filename) || [];
  const documents = req.files?.documents?.map(file => file.filename) || [];

  try {
    const newEntry = await ServiceEntry.create({
      ...req.body,
      photos,
      documents
    });

    return newEntry;

  } catch (err) {
    // Clean up uploaded files on error
    [...photos, ...documents].forEach((filename) => {
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // delete file
      }
    });

    throw err;
  }
};
const getServiceEntryService = async (fleetId) => {
  if (!fleetId) {
    throw new Error('Fleet ID is required');
  }

  const entries = await getServiceEntryByIdDAL(fleetId);
  return entries;
};

module.exports = {
  createServiceEntryService,
  getServiceEntryService
};
