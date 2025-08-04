

const { default: HttpStatus } = require('http-status');
const LOS = require('../../models/common/los.model');

exports.create = async (req) => {
  const { s3Urls, body } = req;

  const title = body?.title?.trim();
  if (!title) {
    throw new Error(HttpStatus.BAD_REQUEST, 'Title is required');
  }

  const isDuplicate = await LOS.isTitleTaken(title);
  if (isDuplicate) {
    throw new Error (HttpStatus.BAD_REQUEST, 'Title already taken');
  }

  const payload = {
    ...body,
    title,
    profileImageURL: s3Urls[0] || '',
  };

  const createdLOS = await LOS.create(payload);
  return createdLOS;
};

exports.getAll = async (queryParams, options) => {
  let { search, ...filter } = queryParams;
  const searchFilter = await LOS.search({ search });
  if (searchFilter && Object.keys(searchFilter).length > 0) {
    filter = { ...filter, ...searchFilter };
  }
  const allLOS = await LOS.paginate(filter, options);
  return allLOS;
};

exports.getSingle = async (id) => {
  return LOS.findById(id);
};



exports.update = async (req) => {
  const { body: updateBody = {}, s3Urls, params } = req;
  const los = await this.getSingle(params.id);
  if (!los) {
    throw new Error(HttpStatus.NOT_FOUND, 'LOS not found');
  }

  if (updateBody.title && await LOS.isTitleTaken(updateBody?.title?.trim(), params.id)) {
    throw new Error(HttpStatus.BAD_REQUEST, 'Title already taken');
  }

  // 🧼 Remove _id using destructuring
  const { id, ...cleanUpdateBody } = updateBody;
  Object.assign(los, {
    ...cleanUpdateBody,
    title: cleanUpdateBody.title?.trim() ?? los.title,
    profileImageURL: s3Urls? s3Urls[0] : los.profileImageURL,
  });

  await los.save();
  return los;
};



exports.remove = async (losId) => {
  const los = await this.getSingleLOS(losId);
  if (!los) {
    throw new Error(HttpStatus.NOT_FOUND, 'LOS not found');
  }
  await los.remove();
  return los;
};
