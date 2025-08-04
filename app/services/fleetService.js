const Fleet = require("../models/fleet");

const create = async (req) => {
  const { user, body } = req
  const newFleet = new Fleet({ user: user?.id, ...body });
  await newFleet.save();
  return newFleet;
};

// const getAll = async (queryParams, options) => {
//   const { search, ...filter } = queryParams;
//   const searchFilter = await Fleet.search({ search });

//   let finalFilter = {};
//   if (searchFilter && Object.keys(searchFilter).length > 0) {
//     if (Object.keys(filter).length > 0) {
//       finalFilter = { $and: [filter, searchFilter] };
//     } else {
//       finalFilter = searchFilter;
//     }
//   } else {
//     finalFilter = filter;
//   }
//   return await Fleet.paginate(finalFilter, options);
// };

const getAll = async (queryParams, options, userId) => {
  const { search, assigned, ...filter } = queryParams;
  const searchFilter = await Fleet.search({ search });
  if (assigned === 'true') {
    filter.assigned_driver = { $ne: null };
  } else if (assigned === 'false') {
    filter.assigned_driver = null;
  }

  let finalFilter = { user: userId };

  if (searchFilter && Object.keys(searchFilter).length > 0) {
    finalFilter = { $and: [ { user: userId }, filter, searchFilter ] };
  } else if (Object.keys(filter).length > 0) {
    finalFilter = { $and: [ { user: userId }, filter ] };
  }

  return await Fleet.paginate(finalFilter, options);
};


const getById = async (id) => {
  return await Fleet.findById(id);
};

const updateById = async (id, data) => {
  return await Fleet.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id) => {
  return await Fleet.findByIdAndDelete(id);
};

const fleetService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};

module.exports = fleetService;
