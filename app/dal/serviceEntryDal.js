const ServiceEntry = require('../models/serviceEntry');

const createServiceEntryDAL = async (data) => {
  try {
    const newServiceEntry = new ServiceEntry(data);
    await newServiceEntry.save();
    return newServiceEntry;
  } catch (error) {
    throw new Error(error);
  }
};

const getServiceEntryByIdDAL = async (fleetId) => {
  try {
    const serviceEntry = await ServiceEntry.find({ fleetId })
      .populate('vendor')
      .populate('issues', '-fleetId')

    return serviceEntry;
  } catch (error) {
    throw new Error(error);
  }
};
const getSingleServiceEntryByIdDAL = async (id) => {
  try {
    const serviceEntry = await ServiceEntry.findById(id)
      .populate('vendor')
      .populate('issues', '-fleetId')
    console.log(serviceEntry);

    return serviceEntry;
  } catch (error) {
    throw new Error("Error fetching service entry");
  }
};
const updateServiceEntryDAL = async (Id, data) => {
  try {
    const existingServiceEntry = await ServiceEntry.findById(Id);

    if (!existingServiceEntry) {
      throw new Error('Service entry not found');
    }
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null) {
        existingServiceEntry[key] = data[key];
      }
    });

    await existingServiceEntry.save();
    return existingServiceEntry;
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  createServiceEntryDAL,
  getServiceEntryByIdDAL,
  updateServiceEntryDAL,
  getSingleServiceEntryByIdDAL
};
