const { default: HttpStatus } = require('http-status');
const mongoose = require('mongoose');
const { FleetType } = require('../../models');

class FleetTypeService {
  async create(data) {
    if (data.isDefault) {
      await FleetType.updateMany({}, { isDefault: false });
    }
    return FleetType.create(data);
  }

  async getAll() {
    return FleetType.find();
  }

  async update(id, data) {
    const existing = await FleetType.findById(id);
    if (!existing) {
      throw new Error(HttpStatus.NOT_FOUND, 'FleetType not found');
    }

    if (data.isDefault) {
      await FleetType.updateMany({}, { isDefault: false });
    }

    return FleetType.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    const existing = await FleetType.findById(id);
    if (!existing) {
      throw new Error(HttpStatus.NOT_FOUND, 'FleetType not found');
    }

    if (!existing.isRemoveAble) {
      throw new Error(
        HttpStatus.BAD_REQUEST,
        `Cannot delete '${existing.name}' as it is not removable`
      );
    }

    return FleetType.findByIdAndDelete(id);
  }

  async bulkDelete(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    const types = await FleetType.find({ _id: { $in: validIds } });

    const nonRemovables = types.filter(t => !t.isRemoveAble);
    if (nonRemovables.length > 0) {
      const names = nonRemovables.map(t => t.name).join(', ');
      throw new Error(
        HttpStatus.BAD_REQUEST,
        `Cannot delete: ${names} are not removable`
      );
    }

    const removableIds = types.filter(t => t.isRemoveAble).map(t => t._id);
    return FleetType.deleteMany({ _id: { $in: removableIds } });
  }
}

module.exports = new FleetTypeService();
