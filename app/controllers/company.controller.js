const BaseController = require('./base.controller');
const companyService = require('../services/company.service');

class CompanyController extends BaseController {
  constructor() {
    super(companyService);
  }
}

module.exports = new CompanyController();
