// services/issue.service.js
const GenericService = require('./generic.service');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const { Role } = require('../models');

class RoleService extends GenericService {
  constructor() {
    super(Role);
  }
 async getAll(queryParams, options) {
    
  const { search,...finalFilter } = queryParams;

  let filter = { ...finalFilter }; 

  const searchFilter = await this.model.search({ search });
  
  if (searchFilter && Object.keys(searchFilter).length > 0) {
    filter = { $and: [ finalFilter, searchFilter] };  
  }
  
  return this.model.paginate(filter, options);
}



}

module.exports = new RoleService();
