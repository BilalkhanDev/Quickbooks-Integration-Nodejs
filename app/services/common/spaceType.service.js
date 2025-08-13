const { default: HttpStatus } = require('http-status');
const { SpaceType } = require('../../models');
const ApiError = require('../../shared/core/exceptions/ApiError');
const GenericService = require('../generic.service');
class SpaceTypeService extends GenericService {
  constructor() {
    super(SpaceType)
  }
  async create(userBody) {
    const title = userBody.title?.trim();
    if (await this.model.isTitleTaken(title)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }
    return this.model.create({ ...userBody, title });
  }

  async getAll(queryParams, options, refFields) {
    let { search, ...filter } = queryParams;
    const searchFilter = await this.model.search({ search }, refFields);
    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }
    const result = await this.model.paginate(filter, {
      ...options,
      populate: { path: 'los', select: '_id title' },
    });

    return result;
  }



  async update(id, updateBody) {
    const spaceType = await this.model.findById(id);
    if (!spaceType) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'SpaceType not found');
    }
    if (
      updateBody.title &&
      (await this.model.isTitleTaken(updateBody.title.trim(), id))
    ) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    Object.assign(spaceType, {
      ...updateBody,
      title: updateBody.title?.trim() ?? this.model.title,
    });

    await this.spaceType.save();
    return spaceType;
  }

}

module.exports = new SpaceTypeService();
