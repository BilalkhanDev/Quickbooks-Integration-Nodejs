const { default: HttpStatus } = require('http-status');
const { ServiceArea } = require('../../models');
const ApiError = require('../../shared/core/exceptions/ApiError');
const GenericService = require('../generic.service');
class ServiceAreaService extends GenericService {
  constructor() {
    super(ServiceArea)
  }
  async create(userBody) {
    const title = userBody.title?.trim();
    if (await this.model.isTitleTaken(title)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    return this.model.create({ ...userBody, title });
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
    const serviceArea = await this.model.findById(id);
    if (!serviceArea) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'ServiceArea not found');
    }

    if (
      updateBody.title &&
      (await this.model.isTitleTaken(updateBody.title.trim(), id))
    ) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    Object.assign(serviceArea, {
      ...updateBody,
      title: updateBody.title?.trim() ?? serviceArea.title,
    });

    await serviceArea.save();
    return serviceArea;
  }

}

module.exports = new ServiceAreaService();
