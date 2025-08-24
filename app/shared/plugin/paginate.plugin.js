const paginate = (schema) => {
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
  schema.statics.paginate = async function (filter, options = {}) {
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

    // Handle populate - Fixed version for nested populate
    if (options.populate) {
      let populateOptions = [];

      if (typeof options.populate === 'string') {
        // Handle comma-separated string like "user,fleet,service"
        populateOptions = options.populate.split(',').map(p => p.trim());
      } else if (Array.isArray(options.populate)) {
        // Handle array of strings or objects
        populateOptions = options.populate;
      } else if (typeof options.populate === 'object') {
        // Handle single object
        populateOptions = [options.populate];
      }
      populateOptions.forEach((popOption) => {
        if (typeof popOption === 'string') {
          docsQuery = docsQuery.populate(popOption);
        } else if (typeof popOption === 'object' && popOption !== null) {
          docsQuery = docsQuery.populate(popOption);
        }
      });
    }
  if (options.select) {
    docsQuery = docsQuery.select(options.select);
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