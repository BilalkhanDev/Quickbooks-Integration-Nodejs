
const { default: HttpStatus } = require('http-status');
const Equipment = require('../../models/common/equipment.model');


exports.create = async (userBody) => {
  if (await Equipment.isTitleTaken(userBody.title.trim())) {
    throw new Error (HttpStatus.BAD_REQUEST, 'Title already taken');
  }
  return Equipment.create(userBody);
};

// /**
//  * Query for users
//  * @param {Object} filter - Mongo filter
//  * @param {Object} options - Query options
//  * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
//  * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//  * @param {number} [options.page] - Current page (default = 1)
//  * @returns {Promise<QueryResult>}
exports.getAll = async (queryParams, options) => {
  
  let { search,...filter } = queryParams;
  const searchFilter = await Equipment.search({search});

  if (searchFilter && Object.keys(searchFilter).length > 0) {
    filter = { ...filter, ...searchFilter };
  }
  const result = await Equipment.paginate(filter, options);
  return result;
};

exports.getSingle = async (id) => {
  return Equipment.findById(id);
};

exports.update = async (id, updateBody) => {
  const result = await this.getSingle(id);
  if (!result) {
    throw new Error (HttpStatus.NOT_FOUND, 'Equipment not found');
  }
  if (updateBody.title && (await Equipment.isTitleTaken(updateBody.title, id))) {
    throw new Error (HttpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

exports.remove = async (id) => {
  const result = await this.getSingle(id);
  if (!result) {
    throw new Error (HttpStatus.NOT_FOUND, 'Equipment not found');
  }
  await result.remove();
  return result;
};
