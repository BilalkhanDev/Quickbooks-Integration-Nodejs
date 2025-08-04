const GenericService = require("../../shared/service/genric.service");
const { Fleet } = require("../models");

exports.create = async (req) => {
  const { user, body } = req
  // const newFleet = new Fleet({ user: user?.id, ...body });
  // await newFleet.save();
  // return newFleet;
  const fleet=await GenericService.create(Fleet,{ user: user?.id, ...body })
  return fleet
};

exports.getAll = async (queryParams, options, userId) => {
  const { search, assigned, ...filter } = queryParams;
  const searchFilter = await Fleet.search({ search });
  if (assigned === 'true') {
    filter.assigned_driver = { $ne: null };
  } else if (assigned === 'false') {
    filter.assigned_driver = null;
  }

  let finalFilter = { user: userId };

  if (searchFilter && Object.keys(searchFilter).length > 0) {
    finalFilter = { $and: [{ user: userId }, filter, searchFilter] };
  } else if (Object.keys(filter).length > 0) {
    finalFilter = { $and: [{ user: userId }, filter] };
  }
  return await Fleet.paginate(finalFilter, options);
};


exports.getById = async (id) => {
  return await GenericService.getById(Fleet,id)
};

exports.updateById = async (id, data) => {
  return await GenericService.updateById(Fleet,id, data);
};

exports.deleteById = async (id) => {
  return await GenericService.deleteById(Fleet,id);
};


