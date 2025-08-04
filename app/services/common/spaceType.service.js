

const { default: HttpStatus } = require('http-status');
const SpaceType = require('../../models/common/spaceType.model');

exports.create = async (userBody) => {
  if (await SpaceType.isTitleTaken(userBody.title.trim())) {
    throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
  }
  return SpaceType.create(userBody);
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
// exports.query = async (queryParams, options) => {
//   let { search, ...filter } = queryParams;
//   const searchFilter = await SpaceType.search({ search });
//   // const data = await SpaceType.search(queryParams,options);
//   if (searchFilter && Object.keys(searchFilter).length > 0) {
//     filter = { ...filter, ...searchFilter };
//   }
//   const allSpacetypes = await SpaceType.paginate(filter, options);
//   return allSpacetypes
// };

exports.getAll = async (queryParams, options,refFileds) => {
  let { search,...filter } = queryParams;
  const searchFilter = await SpaceType.search({ search },refFileds);
  if (searchFilter && Object.keys(searchFilter).length > 0) {
    filter = Object.keys(filter).length > 0
      ? { $and: [filter, searchFilter] }
      : searchFilter;
  }
  const result = await SpaceType.paginate(filter, options);
  return result;
};

exports.getSingle = async (id) => {
  return SpaceType.findById(id);
};

exports.update = async (id, updateBody) => {
  const spaceType = await this.getSingle(id);
  if (!spaceType) {
    throw new Error(HttpStatus.NOT_FOUND, 'SpaceType not found');
  }
  if (updateBody.title && (await SpaceType.isTitleTaken(updateBody.title, id))) {
    throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
  }
  Object.assign(spaceType, updateBody);
  await spaceType.save();
  return spaceType;
};

exports.remove = async (id) => {
  const spaceType = await this.getSingle(id);
  if (!spaceType) {
    throw new Error(HttpStatus.NOT_FOUND, 'SpaceType not found');
  }
  await spaceType.remove();
  return spaceType;
};
