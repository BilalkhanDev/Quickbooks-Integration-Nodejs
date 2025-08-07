const ApiError = require('../shared/core/exceptions/ApiError');
const { Issue, ServiceEntry } = require('../models');

class IssueService {
  async create(req) {
    const data = req.body;
    const uploadedDocs = req?.s3Urls || [];
    const userId = req.user.id;
    const serviceEntry = await ServiceEntry.findById(data.service);
    if (!serviceEntry) {
      throw new ApiError(`ServiceEntry with ID ${data.service} not found.`);
    }

    const payload = {
      ...data,
      user: userId,
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
    return await Issue.find({ service: serviceId });
  }

  async update(req) {
    const { issueId } = req.params;
    const data = req.body;
    const userId = req.user.id;

    const existingDocs = data.existingDocuments || [];
    const uploadedDocs = req?.s3Urls || [];

    const finalDocuments = [...existingDocs, ...uploadedDocs];

    const payload = {
      ...data,
      user: userId,
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
