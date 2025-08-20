
const { AssemblyCode } = require("../../models");
const GenericService = require("../generic.service");
const { default: HttpStatus } = require('http-status');
const ApiError = require("../../shared/core/exceptions/ApiError");
const mongoose  = require("mongoose");


class AssemblyCodeService extends GenericService {
  constructor() {
    super(AssemblyCode);
  }
  async getAll(systemId) {
    if (!systemId || !mongoose.Types.ObjectId.isValid(systemId)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, "Valid systemId is required");
    }
    return await this.model.find({ systemCode: systemId })

  }
}
module.exports = new AssemblyCodeService();
