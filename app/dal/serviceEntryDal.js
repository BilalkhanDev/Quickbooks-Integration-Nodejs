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
    const serviceEntries = await ServiceEntry.aggregate([
      // Filter by fleetId
      { $match: { fleetId: fleetId } },

      // Populate vendor
      {
        $lookup: {
          from: 'vendors', // your Vendor collection name
          localField: 'vendor',
          foreignField: '_id',
          as: 'vendorData'
        }
      },
      { $unwind: { path: '$vendorData', preserveNullAndEmptyArrays: true } },

      // Lookup issues to count them
      {
        $lookup: {
          from: 'issues', // your Issues collection name
          localField: '_id',
          foreignField: 'serviceId',
          as: 'issuesArray'
        }
      },

      // Add a field for issues count
      {
        $addFields: {
          issuesCount: { $size: { $ifNull: ['$issuesArray', []] } }
        }
      },

      // Include both service entry data and vendor/issuesCount
      {
        $project: {
          // ServiceEntry fields you want
          repairPriorityClass: 1,
          odometer: 1,
          void: 1,
          completionDate: 1,
          isStartDate: 1,
          startDate: 1,
          reference: 1,
          labels: 1,
          photos: 1,
          documents: 1,
          comments: 1,
          createdAt: 1,
          updatedAt: 1,

          // Populated vendor
          vendor: '$vendorData',

          // Computed issues count
          issuesCount: 1
        }
      }
    ]);

    return serviceEntries;
  } catch (error) {
    throw new Error(error.message || error);
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
