const { default: HttpStatus } = require('http-status');
const ServiceArea = require('../../models/common/serviceArea.model');



exports.create = async (userBody) => {
  if (await ServiceArea.isTitleTaken(userBody.title.trim())) {
    throw new Error (HttpStatus.BAD_REQUEST, 'Title already taken');
  }
  return ServiceArea.create(userBody);
};

// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
//  */
exports.getAll = async (queryParams, options) => {
  let { search, ...filter } = queryParams;
  const searchFilter = await ServiceArea.search({ search });
  if (searchFilter && Object.keys(searchFilter).length > 0) {
    filter = { ...filter, ...searchFilter };
  }
  const allServiceAreas = await ServiceArea.paginate(filter, options);
  return allServiceAreas;
};

exports.getSingle = async (id) => {
  return ServiceArea.findById(id);
};

exports.update = async (id, updateBody) => {
  const serviceArea = await this.getSingle(id);
  if (!serviceArea) {
    throw new Error (HttpStatus.NOT_FOUND, 'ServiceArea not found');
  }
  if (updateBody.title && (await ServiceArea.isTitleTaken(updateBody.title, id))) {
    throw new Error (HttpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(serviceArea, updateBody);
  await serviceArea.save();
  return serviceArea;
};

exports.remove = async (id) => {
  const serviceArea = await this.getSingle(id);
  if (!serviceArea) {
    throw new Error (HttpStatus.NOT_FOUND, 'ServiceArea not found');
  }
  await serviceArea.remove();
  return serviceArea;
};
