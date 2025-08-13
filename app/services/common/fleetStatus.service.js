// services/fleetStatusService.js

const mongoose = require('mongoose');
const FleetStatus = require('../../models/common/fleetStatus.model');
const GenericService = require('../generic.service');
const ApiError = require('../../shared/core/exceptions/ApiError');

class FleetStatusService extends GenericService  {
constructor(){
  super(FleetStatus)
}
  async create(data) {
    if (data.isDefault) {
      await this.model.updateMany({}, { isDefault: false });
    }
    return this.model.create(data);
  }
  async update(id, data) {
    if (data.isDefault) {
      await this.model.updateMany({}, { isDefault: false });
    }
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
  async bulkDeleteStatuses(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    const statuses = await this.model.find({ _id: { $in: validIds } });

    const nonRemovables = statuses.filter(s => !s.isRemoveAble);
    if (nonRemovables.length > 0) {
      const names = nonRemovables.map(s => s?.name)?.join(', ');
      throw new ApiError(`Cannot delete: [${names}] are not removable.`);
    }

    const removableIds = statuses.filter(s => s.isRemoveAble).map(s => s._id);
    return this.model.deleteMany({ _id: { $in: removableIds } });
  }
}

module.exports = new FleetStatusService();
