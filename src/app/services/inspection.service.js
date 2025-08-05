// services/inspection.service.js
const Inspection = require('../models/inspection/inspection.model');

class InspectionService {
  async getAll() {
    return await Inspection.find().lean();
  }

  async getNames() {
    return await Inspection.find({}, { name: 1 }).lean();
  }

  async getById(inspectionId) {
    return await Inspection.findById(inspectionId).lean();
  }

  async create(data) {
    const inspection = new Inspection(data);
    return await inspection.save();
  }

  async update(inspectionId, updateData) {
    return await Inspection.findByIdAndUpdate(
      inspectionId,
      { $set: updateData },
      { new: true }
    ).lean();
  }
}

module.exports = new InspectionService(); // singleton
