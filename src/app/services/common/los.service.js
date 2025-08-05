const { default: HttpStatus } = require('http-status');
const { LOS } = require('../../models');
class LOSService {
  async create(req) {
    const { s3Urls = [], body } = req;

    const title = body?.title?.trim();
    if (!title) {
      throw new Error(HttpStatus.BAD_REQUEST, 'Title is required');
    }

    const isDuplicate = await LOS.isTitleTaken(title);
    if (isDuplicate) {
      throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    const payload = {
      ...body,
      title,
      profileImageURL: s3Urls[0] || '',
    };

    return LOS.create(payload);
  }

  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await LOS.search({ search });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }

    return LOS.paginate(filter, options);
  }

  async getSingle(id) {
    return LOS.findById(id);
  }

  async update(req) {
    const { body: updateBody = {}, s3Urls, params } = req;

    const los = await this.getSingle(params.id);
    if (!los) {
      throw new Error(HttpStatus.NOT_FOUND, 'LOS not found');
    }

    if (
      updateBody.title &&
      (await LOS.isTitleTaken(updateBody.title.trim(), params.id))
    ) {
      throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    const { id, ...cleanUpdateBody } = updateBody;
    Object.assign(los, {
      ...cleanUpdateBody,
      title: cleanUpdateBody.title?.trim() ?? los.title,
      profileImageURL: s3Urls ? s3Urls[0] : los.profileImageURL,
    });

    await los.save();
    return los;
  }

  async remove(losId) {
    const los = await this.getSingle(losId);
    if (!los) {
      throw new Error(HttpStatus.NOT_FOUND, 'LOS not found');
    }

    await los.remove();
    return los;
  }
}

module.exports = new LOSService();
