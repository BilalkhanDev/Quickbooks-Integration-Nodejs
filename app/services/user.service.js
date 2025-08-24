const { User } = require("../models");
const ApiError = require("../shared/core/exceptions/ApiError");
const GenericService = require("./generic.service");
const { default: HttpStatus } = require('http-status');
class UserService extends GenericService {
    constructor() {
        super(User);
    }

    async getAll(queryParams, options) {
        const { search, ...finalFilter } = queryParams;

        let filter = { ...finalFilter };
        const searchFilter = await this.model.search({ search });
        if (searchFilter && Object.keys(searchFilter).length > 0) {
            filter = { $and: [finalFilter, searchFilter] };
        }
        const populate = [
            { path: 'role', select: '_id title' },

        ];
        return this.model.paginate(filter, {
            ...options,
            populate,
        });
    }
   async getById(id) {
    const user = await this.model.findById(id).populate('role').select('-password'); // Assuming 'role' is the field that holds the reference to Role

    if (!user) {
      throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
    }

    return user;
  }

}

module.exports = new UserService();
