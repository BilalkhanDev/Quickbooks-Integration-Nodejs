// services/fleetStatusService.js

const mongoose = require('mongoose');
const FleetStatus = require('../../models/common/fleetStatus.model');

class FleetStatusService {
  async create(data) {
    if (data.isDefault) {
      await FleetStatus.updateMany({}, { isDefault: false });
    }
    return FleetStatus.create(data);
  }

  async getAll() {
    return FleetStatus.find();
  }

  async getById(id) {
    return FleetStatus.findById(id);
  }

  async update(id, data) {
    if (data.isDefault) {
      await FleetStatus.updateMany({}, { isDefault: false });
    }
    return FleetStatus.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return FleetStatus.findByIdAndDelete(id);
  }

  async bulkDeleteStatuses(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    const statuses = await FleetStatus.find({ _id: { $in: validIds } });

    const nonRemovables = statuses.filter(s => !s.isRemoveAble);
    if (nonRemovables.length > 0) {
      const names = nonRemovables.map(s => s.name).join(', ');
      throw new Error(`Cannot delete: [${names}] are not removable.`);
    }

    const removableIds = statuses.filter(s => s.isRemoveAble).map(s => s._id);
    return FleetStatus.deleteMany({ _id: { $in: removableIds } });
  }
}

module.exports = new FleetStatusService();
