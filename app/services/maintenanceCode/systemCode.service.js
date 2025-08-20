const mongoose = require("mongoose")
const { SystemCode } = require("../../models");
const GenericService = require("../generic.service");
const { default: HttpStatus } = require('http-status');
const ApiError = require("../../shared/core/exceptions/ApiError");

class SystemCodeService extends GenericService {
  constructor() {
    super(SystemCode);
  }
  async getAll(categoryId) {
    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Valid Category Id is required");
    }
    return await this.model.find({ categoryCode: categoryId })

  }
}
module.exports = new SystemCodeService();
