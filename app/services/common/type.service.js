const { default: HttpStatus } = require('http-status');
const mongoose = require('mongoose');
const { FleetType } = require('../../models');
const GenericService = require('../generic.service');

class FleetTypeService extends GenericService {
  constructor() {
    super(FleetType)
  }
  async create(data) {
    if (data.isDefault) {
      await this.model.updateMany({}, { isDefault: false });
    }
    return this.model.create(data);
  }



  async update(id, data) {
    const existing = await this.model.findById(id);
    if (!existing) {
      throw new Error(HttpStatus.NOT_FOUND, 'FleetType not found');
    }

    if (data.isDefault) {
      await this.model.updateMany({}, { isDefault: false });
    }

    return this.model.findByIdAndUpdate(id, data, { new: true });
  }



  async bulkDelete(ids) {
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    const types = await this.model.find({ _id: { $in: validIds } });

    const nonRemovables = types.filter(t => !t.isRemoveAble);
    if (nonRemovables.length > 0) {
      const names = nonRemovables.map(t => t.name).join(', ');
      throw new Error(
        HttpStatus.BAD_REQUEST,
        `Cannot delete: ${names} are not removable`
      );
    }

    const removableIds = types.filter(t => t.isRemoveAble).map(t => t._id);
    return this.model.deleteMany({ _id: { $in: removableIds } });
  }
}

module.exports = new FleetTypeService();
