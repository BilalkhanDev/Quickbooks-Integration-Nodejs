// services/fuelTypeService.js

const mongoose = require('mongoose');
const { FuelType } = require('../../models');

class FuelTypeService {
  async create(data) {
    return FuelType.create(data);
  }

  async getAll() {
    return FuelType.find();
  }

  async update(id, data) {
    return FuelType.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return FuelType.findByIdAndDelete(id);
  }

  async bulkDelete(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    return FuelType.deleteMany({ _id: { $in: validIds } });
  }
}

module.exports = new FuelTypeService();
