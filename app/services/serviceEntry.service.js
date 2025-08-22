// services/serviceEntry.service.js
const mongoose = require('mongoose');
const { default: HttpStatus } = require('http-status');
const { ServiceEntry, ServiceTask } = require('../models');
const ApiError = require('../shared/core/exceptions/ApiError');
const GenericService = require('./generic.service');

class ServiceEntryService extends GenericService {
  constructor() {
    super(ServiceEntry);
  }

 async create(data) {
  // Loop through line items and populate maintanceCategories if needed
  for (let li of data.lineItems) {
    const serviceTask = await ServiceTask.findById(li.serviceTask); // Correctly using ObjectId for lookup
    if (serviceTask && !li.maintanceCategories) {
      li.maintanceCategories = serviceTask.maintanceCategories; // Populating maintanceCategories from the ServiceTask
    }
  }

  const document = new this.model(data);
  return await document.save();
}

  // Update Service Entry - Ensure maintanceCategories is populated if not already set
  async update(id,updatedData) {

    //  // Populate for each lineItem if maintanceCategories are missing
    // if (updatedData.lineItems) {
    //   for (let li of updatedData.lineItems) {
    //     if (li.serviceTask && !li.maintanceCategories) {
    //       const serviceTask = await ServiceTask.findById(li.serviceTask);
    //       if (serviceTask) {
    //         li.maintanceCategories = serviceTask.maintanceCategories;
    //       }
    //     }
    //   }
    // }

    // Perform update
    const updated = await this.model.findOneAndUpdate(
      { _id: id},
      updatedData,
      { new: true }
    );

    if (!updated) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Service entry not found or unauthorized');
    }

    return updated;
  }
  async getByFleetId(queryParams, options, userId, fleetId) {
    if (!fleetId || !mongoose.Types.ObjectId.isValid(fleetId)) {
      throw new ApiError(HttpStatus.BAD_REQUEST,'Invalid Fleet ID');
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(HttpStatus.BAD_REQUEST,'Invalid User ID');
    }

    const { search, ...filter } = queryParams;

    const searchFilter = await this.model.search?.({ search }); // Optional static method
    let finalFilter = {
      fleet: new mongoose.Types.ObjectId(fleetId),
      user: new mongoose.Types.ObjectId(userId),
    };

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      finalFilter = {
        $and: [
          { fleet: new mongoose.Types.ObjectId(fleetId) },
          { user: new mongoose.Types.ObjectId(userId) },
          filter,
          searchFilter,
        ],
      };
    } else if (Object.keys(filter).length > 0) {
      finalFilter = {
        $and: [
          { fleet: new mongoose.Types.ObjectId(fleetId) },
          { user: new mongoose.Types.ObjectId(userId) },
          filter,
        ],
      };
    }

    const result = await this.model.paginate(finalFilter, {
      ...options,
      populate: 'issuesCount vendor',
    });

    return result;
  }
  async getById(id) {
    const entry = await ServiceEntry.findOne({ _id: id })
      .populate('vendor', '_id name')
      .populate('issues', '-fleetId')
      .populate({
        path: 'lineItems', 
        select: 'serviceTask maintanceCategories', 
        populate: [
          {
            path: 'serviceTask', 
            select: 'title', 
            populate: {
              path: 'maintanceCategories', 
              select: 'categoryCode systemCode assemblyCode reasonToRepair', 
              populate: [
                {
                  path: 'categoryCode',
                  model: 'CategoryCode', 
                  select: 'title description', 
                },
                {
                  path: 'systemCode',
                  model: 'SystemCode',
                  select: 'code description', 
                },
                {
                  path: 'assemblyCode',
                  model: 'AssemblyCode', 
                  select: 'code description', 
                },
                {
                  path: 'reasonToRepair',
                  model: 'ReasonCode', 
                  select: 'reason description',
                }
              ]
            }
          }
        ]
      })
      .exec();


    if (!entry) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Service entry not found or unauthorized');
    }

    return entry;
  }

// here' we override the generic servive update to add custom 
  // async update(req) {
  //   const { id } = req.params;
  //   const user = req.user.id;

  //   const updated = await this.model.findOneAndUpdate(
  //     { _id: id, user },
  //     { ...req.body },
  //     { new: true }
  //   );

  //   if (!updated) {
  //     throw new ApiError(HttpStatus.NOT_FOUND,'Service entry not found or unauthorized');
  //   }

  //   return updated;
  // }

// async getById(id, userId) {
//   console.log("Id", userId)
//   const entry = await this.model.findOne({
//     _id: id,
//     user: userId,
//   })
//     .populate('vendor', '_id name')
//     .populate('issues', '-fleetId')
//     .populate({
//       path: 'lineItems.serviceTask',
//       select: 'maintanceCategories',
//       populate: {
//         path: 'maintanceCategories.categoryCode',
//         model: 'Category',  // Populate categoryCode with Category data
//         select: '_id name', // You can select fields like name for categoryCode
//       },
//     })
//     .populate({
//       path: 'lineItems.serviceTask.maintanceCategories.systemCode',
//       model: 'SystemCode',  // Populate systemCode with SystemCode data
//       select: '_id name',   // You can select fields like name for systemCode
//     })
//     .populate({
//       path: 'lineItems.serviceTask.maintanceCategories.assemblyCode',
//       model: 'AssemblyCode',  // Populate assemblyCode with AssemblyCode data
//       select: '_id name',     // You can select fields like name for assemblyCode
//     })
//     .populate({
//       path: 'lineItems.serviceTask.maintanceCategories.reasonToRepair',
//       model: 'ReasonCode',  // Populate reasonToRepair with ReasonCode data
//       select: '_id name',    // You can select fields like name for reasonToRepair
//     });

//   if (!entry) {
//     throw new ApiError(HttpStatus.NOT_FOUND, 'Service entry not found or unauthorized');
//   }
//     console.log("Entry", entry)
//   // Loop through the lineItems to ensure the nested objects are populated correctly
//   entry.lineItems.forEach(lineItem => {
//     const maintanceCategories = lineItem.maintanceCategories || {};

//     // If any field is missing in maintanceCategories, populate from serviceTask
//     if (!maintanceCategories.categoryCode) {
//       const serviceTask = lineItem.serviceTask;
//       if (serviceTask && serviceTask.maintanceCategories) {
//         lineItem.maintanceCategories = lineItem.maintanceCategories || {};

//         lineItem.maintanceCategories.categoryCode = serviceTask.maintanceCategories.categoryCode || null;
//         lineItem.maintanceCategories.systemCode = serviceTask.maintanceCategories.systemCode || null;
//         lineItem.maintanceCategories.assemblyCode = serviceTask.maintanceCategories.assemblyCode || null;
//         lineItem.maintanceCategories.reasonToRepair = serviceTask.maintanceCategories.reasonToRepair || null;
//       }
//     }
//   });

//   // Return the populated entry with the correct nested structure
//   return entry;
// }




}

module.exports = new ServiceEntryService();
