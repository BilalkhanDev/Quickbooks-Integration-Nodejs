const { Documents } = require("../models");
const GenericService = require("./generic.service");

class DocumentService extends GenericService {
  constructor() {
    super(Documents);
  }

  async create(req) {
    if (req?.s3Urls?.length > 0) {
      const documents = await Promise.all(
        req.s3Urls.map(async (url) => {
          const document = await new this.model({
            user: req.user.id,
            documentUrl: url,
            documentType: req.body.documentType,
          }).save();
          return document;
        })
      );
      return documents;
    }
    return [];
  }

  async getAll(queryParams, options, userId) {
    let { search, documentType, ...filter } = queryParams;
    const searchFilter = await this.model.search({ search, documentType });

    if (searchFilter && Object.keys(searchFilter).length > 0) {
      filter = { ...filter, ...searchFilter };
    }

    let finalFilter = { user: userId };
    if (searchFilter && Object.keys(searchFilter).length > 0) {
      finalFilter = { $and: [{ user: userId }, filter, searchFilter] };
    } else if (Object.keys(filter).length > 0) {
      finalFilter = { $and: [{ user: userId }, filter] };
    }

    const results = await this.model.paginate(finalFilter, options);
    return results;
  }
}

module.exports = new DocumentService();
