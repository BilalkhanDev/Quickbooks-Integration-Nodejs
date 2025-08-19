// services/issue.service.js
const { Issue, ServiceEntry } = require('../models');
const GenericService = require('./generic.service');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');

class IssueService extends GenericService {
  constructor() {
    super(Issue);
  }

  async create(req) {
    const data = req.body;
    const userId = req.user.id;

    const serviceEntry = await ServiceEntry.findById(data.service);
    if (!serviceEntry) {
      throw new ApiError(HttpStatus.NOT_FOUND,`ServiceEntry with ID ${data.service} not found.`);
    }

    const payload = {
      ...data,
      user: userId,
    };

    const issue = new this.model(payload);
    await issue.save();
    return issue;
  }

  async getByServiceId(serviceId) {
    return await this.model.find({ service: serviceId });
  }

}

module.exports = new IssueService();
