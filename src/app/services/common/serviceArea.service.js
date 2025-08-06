const { default: HttpStatus } = require('http-status');
const { ServiceArea } = require('../../models');
const ApiError = require('../../../shared/core/exceptions/ApiError');
class ServiceAreaService {
  async create(userBody) {
    const title = userBody.title?.trim();
    if (await ServiceArea.isTitleTaken(title)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    return ServiceArea.create({ ...userBody, title });
  }

  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await ServiceArea.search({ search });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }

    return ServiceArea.paginate(filter, options);
  }

  async getById(id) {
    return ServiceArea.findById(id);
  }

  async update(id, updateBody) {
    const serviceArea = await this.getById(id);
    if (!serviceArea) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'ServiceArea not found');
    }

    if (
      updateBody.title &&
      (await ServiceArea.isTitleTaken(updateBody.title.trim(), id))
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

  async remove(id) {
    const serviceArea = await this.getById(id);
    if (!serviceArea) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'ServiceArea not found');
    }

    await serviceArea.remove();
    return serviceArea;
  }
}

module.exports = new ServiceAreaService();
