const GenericService = require('./generic.service');
const Company = require('../models/company.model');

class CompanyService extends GenericService {
  constructor() {
    super(Company);
  }
}

module.exports = new CompanyService();
