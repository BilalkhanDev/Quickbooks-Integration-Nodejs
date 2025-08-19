const { default: HttpStatus } = require('http-status');
const { Equipment } = require('../../models');
const ApiError = require('../../shared/core/exceptions/ApiError');
const GenericService = require('../generic.service');
class EquipmentService extends GenericService {
  constructor() {
    super(Equipment);
  }
  async create(data) {

    const isTaken = await this.model.isTitleTaken(data.title.trim());
    if (isTaken) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }
    return this.model.create(data);
  }

  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await this.model.search({ search });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }

    return this.model.paginate(filter, options);
  }


  async update(id, updateBody) {
    const equipment = await this.model.findById(id);
    if (updateBody.title && await this.model.isTitleTaken(updateBody.title, id)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    Object.assign(equipment, updateBody);
    await equipment.save();
    return equipment;
  }


}

module.exports = new EquipmentService();
