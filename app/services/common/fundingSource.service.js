

const { default: HttpStatus } = require('http-status');
const Fundingsource = require('../../models/common/fundingSource.model');

exports.create = async (req) => {
   const { s3Urls, body } = req;

  const title = body?.title?.trim();
  if (!title) {
    throw new Error(HttpStatus.BAD_REQUEST, 'Title is required');
  }

  const isDuplicate = await Fundingsource.isTitleTaken(title);
  if (isDuplicate) {
    throw new Error (HttpStatus.BAD_REQUEST, 'Title already taken');
  }

  const payload = {
    ...body,
    title,
    profileImageURL: s3Urls[0] || '',
  };

  const createdFs = await Fundingsource.create(payload);
  return createdFs;

};

exports.getAll= async (queryParams, options) => {
  let { search,...filter } = queryParams;
  const searchFilter = await Fundingsource.search({search});
  if (searchFilter && Object.keys(searchFilter).length > 0) {
    filter = { ...filter, ...searchFilter };
  }
  const result = await Fundingsource.paginate(filter, options);
  return result;
};

exports.getSingle = async (id) => {
  return Fundingsource.findById(id);
};

exports.update = async (req) => {
  const { body: updateBody = {}, s3Urls, params } = req;
  const fs = await this.getSingle(params.id);
  if (!fs) {
    throw new Error(HttpStatus.NOT_FOUND, 'Funding Source not found');
  }

  if (updateBody.title && await Fundingsource.isTitleTaken(updateBody?.title?.trim(), params.id)) {
    throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
  }

  const { id, ...cleanUpdateBody } = updateBody;
  Object.assign(fs, {
    ...cleanUpdateBody,
    title: cleanUpdateBody.title?.trim() ?? fs.title,
    profileImageURL: s3Urls? s3Urls[0] : los.profileImageURL,
  });

  await fs.save();
  return fs;
};

exports.delete = async (id) => {
  const result = await this.getSingle(id);
  if (!result) {
    throw new Error(HttpStatus.NOT_FOUND, 'Fundingsource not found');
  }
  await result.remove();
  return result;
};
