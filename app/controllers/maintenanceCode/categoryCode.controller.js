const { CategoryCode } = require("../../models");
const GenericService = require("../../services/generic.service");
const BaseController = require("../base.controller");



class CategoryCodeController extends BaseController {
  constructor() {
    super(new GenericService(CategoryCode));
  }
}

module.exports = new CategoryCodeController();
