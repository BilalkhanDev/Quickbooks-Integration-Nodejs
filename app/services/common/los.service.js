const { default: HttpStatus } = require('http-status');
const { LOS } = require('../../models');
const ApiError = require('../../shared/core/exceptions/ApiError');
const GenericService = require('../generic.service');
class LOSService extends GenericService {
  constructor() {
    super(LOS)
  }

  async create(req) {
    const { s3Urls = [], body } = req;

    const title = body?.title?.trim();
    if (!title) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title is required');
    }

    const isDuplicate = await this.model.isTitleTaken(title);
    if (isDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    const payload = {
      ...body,
      title,
      profileImageURL: s3Urls[0] || '',
    };

    return this.model.create(payload);
  }

  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await this.model.search({ search });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }

    return this.model.paginate(filter, options);
  }


  async update(req) {
    const { body: updateBody = {}, s3Urls, params } = req;

    const los = await this.getSingle(params.id);
    if (!los) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'LOS not found');
    }

    if (
      updateBody.title &&
      (await this.model.isTitleTaken(updateBody.title.trim(), params.id))
    ) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
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
}

module.exports = new LOSService();
