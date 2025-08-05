const { default: HttpStatus } = require('http-status');
const ApiError = require('../../../shared/core/exceptions/apiError');
const { FundingSource } = require('../../models');

class FundingSourceService {
  async create(req) {
    const { s3Urls = [], body } = req;
    const title = body?.title?.trim();

    if (!title) {
      throw new Error(HttpStatus.BAD_REQUEST, 'Title is required');
    }

    const isDuplicate = await FundingSource.isTitleTaken(title);
    if (isDuplicate) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Title already taken');
    }

    const payload = {
      ...body,
      title,
      profileImageURL: s3Urls[0] || '',
    };

    return FundingSource.create(payload);
  }

  async getAll(queryParams, options) {
    let { search, ...filter } = queryParams;
    const searchFilter = await FundingSource.search({ search });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }

    return FundingSource.paginate(filter, options);
  }

  async getSingle(id) {
    return FundingSource.findById(id);
  }

  async update(req) {
    const { body: updateBody = {}, s3Urls, params } = req;
    const fs = await this.getSingle(params.id);

    if (!fs) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Funding Source not found');
    }

    if (
      updateBody.title &&
      (await FundingSource.isTitleTaken(updateBody.title.trim(), params.id))
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

  async delete(id) {
    const result = await this.getSingle(id);
    if (!result) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Fundingsource not found');
    }

    await result.remove();
    return result;
  }
}

module.exports = new FundingSourceService();
