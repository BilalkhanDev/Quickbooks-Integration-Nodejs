const { default: HttpStatus } = require('http-status');
const { FundingSource } = require('../../models');
const ApiError = require('../../shared/core/exceptions/ApiError');
const GenericService = require('../generic.service');

class FundingSourceService  extends GenericService {
  constructor() {
    super(FundingSource)
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
    const fs = await this.model.findById(params.id);

    if (!fs) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Funding Source not found');
    }

    if (
      updateBody.title &&
      (await this.model.isTitleTaken(updateBody.title.trim(), params.id))
    ) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    Object.assign(fs, {
      ...updateBody,
      title: updateBody.title?.trim() ?? fs.title,
      profileImageURL: s3Urls ? s3Urls[0] : fs.profileImageURL,
    });

    await fs.save();
    return fs;
  }


}

module.exports = new FundingSourceService();
