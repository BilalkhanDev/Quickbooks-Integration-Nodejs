const { default: HttpStatus } = require('http-status');
const { Equipment } = require('../../models');
const ApiError = require('../../shared/core/exceptions/ApiError');

class EquipmentService {
  async create(data) {
    
    const isTaken = await Equipment.isTitleTaken(data.title.trim());
    if (isTaken) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }
    return Equipment.create(data);
  }

  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await Equipment.search({ search });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }

    return Equipment.paginate(filter, options);
  }

  async getById(id) {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Equipment not found');
    }
    return equipment;
  }

  async update(id, updateBody) {
    const equipment = await this.getById(id);

    if (updateBody.title && await Equipment.isTitleTaken(updateBody.title, id)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    Object.assign(equipment, updateBody);
    await equipment.save();
    return equipment;
  }

  async remove(id) {
    const equipment = await this.getById(id);
    await equipment.remove();
    return equipment;
  }
}

module.exports = new EquipmentService();
