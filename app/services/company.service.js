// services/company.service.js
const Company = require('../models/company.model');

class CompanyService {
  async create(data) {
    const company = new Company(data);
    return await company.save();
  }

  async getAll() {
    return await Company.find();
  }

  async getById(id) {
    return await Company.findById(id);
  }

  async update(id, data) {
    return await Company.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await Company.findByIdAndDelete(id);
  }
}

module.exports = new CompanyService();
