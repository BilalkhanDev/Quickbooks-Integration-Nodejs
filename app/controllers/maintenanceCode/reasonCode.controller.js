const { ReasonCode } = require("../../models");
const GenericService = require("../../services/generic.service");
const BaseController = require("../base.controller");


class ReasonCodeController extends BaseController {
  constructor() {
    super(new GenericService(ReasonCode));
    }

}

module.exports = new ReasonCodeController();
