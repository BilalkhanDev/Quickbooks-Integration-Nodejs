// controllers/serviceEntry.controller.js
const HttpStatus = require('http-status').default;
const serviceTaskService = require('../services/serviceTask.service');
const BaseController = require('./base.controller');


class ServiceTaskController extends BaseController {
  constructor() {
    super(serviceTaskService);
  }


}

module.exports = new ServiceTaskController();
