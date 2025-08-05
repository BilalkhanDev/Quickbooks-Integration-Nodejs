const ApiError = require('../../shared/core/exceptions/apiError');
const { Issue, ServiceEntry } = require('../models');

class IssueService {
  async create(req) {
    const data = req.body;
    const uploadedDocs = req?.s3Urls || [];

    const serviceEntry = await ServiceEntry.findById(data.serviceId);
    if (!serviceEntry) {
      throw new ApiError(`ServiceEntry with serviceId ${data.serviceId} not found.`);
    }

    const payload = {
      ...data,
      documents: uploadedDocs,
    };

    const issue = new Issue(payload);
    await issue.save();
    return issue;
  }

  async getById(issueId) {
    const issue = await Issue.findById(issueId);
    if (!issue) {
      throw new ApiError(`Issue with ID ${issueId} not found`);
    }
    return issue;
  }

  async getAll(filter = {}) {
    return await Issue.find(filter);
  }

  async getByServiceId(serviceId) {
    return await Issue.find({ serviceId });
  }

  async update(req) {
    const { issueId } = req.params;
    const data = req.body;

    const existingDocs = data.existingDocuments || [];
    const uploadedDocs = req?.s3Urls || [];

    const finalDocuments = [...existingDocs, ...uploadedDocs];
    const payload = {
      ...data,
      documents: finalDocuments,
    };
    delete payload.existingDocuments;

    const updated = await Issue.findByIdAndUpdate(issueId, payload, { new: true });
    if (!updated) {
      throw new ApiError(`Issue with ID ${issueId} not found`);
    }

    return updated;
  }

  async delete(issueId) {
    const deleted = await Issue.findByIdAndDelete(issueId);
    if (!deleted) {
      throw new ApiError(`Issue with ID ${issueId} not found`);
    }
    return deleted;
  }
}

module.exports = new IssueService();
