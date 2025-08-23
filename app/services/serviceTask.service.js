const { ServiceTask } = require("../models");
const GenericService = require("./generic.service");

class ServiceTaskService extends GenericService {
  constructor() {
    super(ServiceTask);
  }
async getAll(queryParams, options) {
  
  const { search, ...finalFilter } = queryParams;

  let filter = { ...finalFilter };
  const searchFilter = await this.model.search({ search});
  if (searchFilter && Object.keys(searchFilter).length > 0) {
    filter = { $and: [finalFilter, searchFilter] };
  }
  const populate = [
   {path: 'maintanceCategories.categoryCode',select:'_id title'},
   {path: 'maintanceCategories.systemCode',select:'_id title'},
   {path: 'maintanceCategories.assemblyCode',select:'_id title'},
   {path: 'maintanceCategories.reasonToRepair',select:'_id title'},
   
  ];
  return this.model.paginate(filter, {
    ...options,     
    populate,        
  });
}

}

module.exports = new ServiceTaskService();
