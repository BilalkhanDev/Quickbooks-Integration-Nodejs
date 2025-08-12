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

    // Handle populate - Fixed version
    if (options.populate) {
      const processPopulate = (populate) => {
        if (typeof populate === 'string') {
          // Handle nested populate like "user.profile" or simple "user"
          if (populate.includes('.')) {
            const parts = populate.split('.');
            return parts.reverse().reduce((acc, part) => 
              acc ? { path: part, populate: acc } : { path: part }
            );
          }
          return { path: populate };
        }
        
        if (typeof populate === 'object' && populate !== null) {
          return populate;
        }
        
        return null;
      };

      let populateOptions = [];

      if (typeof options.populate === 'string') {
        // Handle comma-separated string like "user,fleet,service"
        populateOptions = options.populate.split(',')
          .map(p => p.trim())
          .map(processPopulate)
          .filter(Boolean);
      } else if (Array.isArray(options.populate)) {
        // Handle array of strings or objects
        populateOptions = options.populate
          .map(processPopulate)
          .filter(Boolean);
      } else if (typeof options.populate === 'object') {
        // Handle single object
        populateOptions = [processPopulate(options.populate)].filter(Boolean);
      }

      // Apply populate options
      populateOptions.forEach((popOption) => {
        docsQuery = docsQuery.populate(popOption);
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