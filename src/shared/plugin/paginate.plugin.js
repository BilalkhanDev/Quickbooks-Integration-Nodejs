/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string|Array|Object} [options.populate] - Populate fields (string, array of strings/objects, or single object)
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc)
   * @param {number} [options.limit] - Max results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsQuery = this.find(filter).sort(sort).skip(skip).limit(limit);

    // Handle populate
    if (options.populate) {
      let populateArray = [];

      if (typeof options.populate === 'string') {
        // e.g. "member,driver.profile"
        populateArray = options.populate.split(',').map(p =>
          p.split('.').reverse().reduce((a, b) => ({ path: b, populate: a }))
        );
      } else if (Array.isArray(options.populate)) {
        populateArray = options.populate.map(p => {
          if (typeof p === 'string') {
            return p.split('.').reverse().reduce((a, b) => ({ path: b, populate: a }));
          }
          return p; // object format
        });
      } else if (typeof options.populate === 'object') {
        populateArray = [options.populate];
      }

      populateArray.forEach((pop) => {
        docsQuery = docsQuery.populate(pop);
      });
    }

    const docsPromise = docsQuery.exec();

    return Promise.all([countPromise, docsPromise]).then(([totalResults, results]) => {
      const totalPages = Math.ceil(totalResults / limit);
      return {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
    });
  };
};

module.exports = paginate;
