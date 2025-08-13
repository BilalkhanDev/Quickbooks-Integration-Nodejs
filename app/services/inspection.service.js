// services/inspection.service.js
const { Inspection } = require('../models');
const GenericService = require('./generic.service');

class InspectionService extends GenericService {
  constructor() {
    super(Inspection); 
  }
  async getNames() {
    return await this.model.find({}, { name: 1, _id: 1 }).lean();
  }
}

module.exports = new InspectionService();
