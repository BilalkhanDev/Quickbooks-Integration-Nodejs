const { default: HttpStatus } = require('http-status');
const { SpaceType } = require('../../models');
class SpaceTypeService {
  async create(userBody) {
    const title = userBody.title?.trim();
    if (await SpaceType.isTitleTaken(title)) {
      throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    return SpaceType.create({ ...userBody, title });
  }

  async getAll(queryParams, options, refFields) {
    let { search, ...filter } = queryParams;
    const searchFilter = await SpaceType.search({ search }, refFields);

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = Object.keys(filter).length > 0
        ? { $and: [filter, searchFilter] }
        : searchFilter;
    }

    return SpaceType.paginate(filter, options);
  }

  async getSingle(id) {
    return SpaceType.findById(id);
  }

  async update(id, updateBody) {
    const spaceType = await this.getSingle(id);
    if (!spaceType) {
      throw new Error(HttpStatus.NOT_FOUND, 'SpaceType not found');
    }

    if (
      updateBody.title &&
      (await SpaceType.isTitleTaken(updateBody.title.trim(), id))
    ) {
      throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    Object.assign(spaceType, {
      ...updateBody,
      title: updateBody.title?.trim() ?? spaceType.title,
    });

    await spaceType.save();
    return spaceType;
  }

  async remove(id) {
    const spaceType = await this.getSingle(id);
    if (!spaceType) {
      throw new Error(HttpStatus.NOT_FOUND, 'SpaceType not found');
    }

    await spaceType.remove();
    return spaceType;
  }
}

module.exports = new SpaceTypeService();
