// services/fuelTypeService.js

const mongoose = require('mongoose');
const { FuelType } = require('../../models');
const GenericService = require('../generic.service');

class FuelTypeService extends GenericService {
  constructor() {
    super(FuelType)
  }

  async bulkDelete(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    return this.model.deleteMany({ _id: { $in: validIds } });
  }
}

module.exports = new FuelTypeService();
