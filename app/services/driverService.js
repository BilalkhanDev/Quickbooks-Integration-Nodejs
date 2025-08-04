// services/driverService.js
const driverDal = require("../dal/driverDal");
const Driver = require("../models/driver");

const getAll = async (queryParams, options, userId) => {
   const { search, assigned, ...filter } = queryParams;
    const searchFilter = await Driver.search({ search });
    if (assigned === 'true') {
      filter.fleet = { $ne: null };
    } else if (assigned === 'false') {
      filter.fleet= null;
    }
  
    let finalFilter = { user: userId };
  
    if (searchFilter && Object.keys(searchFilter).length > 0) {
      finalFilter = { $and: [ { user: userId }, filter, searchFilter ] };
    } else if (Object.keys(filter).length > 0) {
      finalFilter = { $and: [ { user: userId }, filter ] };
    }
  
    return await Driver.paginate(finalFilter, options);
};
const getById = async (id) => await driverDal.getById(id);
const getByFleetId = async (fleetId) => await driverDal.getByFleetId(fleetId);

const create = async (data, user) => {
  const existingDriver = await driverDal.findOne({ email: data?.email, user });
  if (existingDriver) {
    throw new Error('A driver with this email already exists.');
  }

  return await driverDal.create({ user, ...data });
};
const updateById = async (id, data) => await driverDal.updateById(id, data);

module.exports = {
  getAll,
  getById,
  getByFleetId,
  create,
  updateById,
};
