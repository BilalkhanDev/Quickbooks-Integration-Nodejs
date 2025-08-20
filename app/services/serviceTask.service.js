const { ServiceTask } = require("../models");
const GenericService = require("./generic.service");

class ServiceTaskService extends GenericService {
  constructor() {
    super(ServiceTask);
  }
}

module.exports = new ServiceTaskService();
