
const { Documents } = require("../models");
const ApiError = require("../shared/core/exceptions/ApiError");

class DocumentService {
    async add(req) {
        if (req?.s3Urls.length > 0) {
            const documents = await Promise.all(
                req.s3Urls.map(async (url) => {  // Make sure the map is async
                    const document = await new Documents({
                        user: req.user.id,
                        documentUrl: url,
                        documentType: req.body.documentType,
                    }).save();
                    return document;  // Return the saved document
                })
            );

            return documents;  // Return the array of saved documents
        } else {
            return [];  // If no files, return an empty array
        }
    }
    async getAll(queryParams, options, userId) {
        let { search, documentType,...filter } = queryParams;
        const searchFilter = await Documents.search({ search ,documentType});

        if (searchFilter && Object.keys(searchFilter).length > 0) {
            filter = { ...filter, ...searchFilter };
        }
        let finalFilter = { user: userId };
        if (searchFilter && Object.keys(searchFilter).length > 0) {
            finalFilter = { $and: [{ user: userId }, filter, searchFilter] };
        } else if (Object.keys(filter).length > 0) {
            finalFilter = { $and: [{ user: userId }, filter] };
        }

        const results = await Documents.paginate(finalFilter, options);
        return results

    }

}

module.exports = new DocumentService();
