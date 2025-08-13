// controllers/fleetSpec.controller.js
const BaseController = require('./base.controller');
const fleetSpecService = require('../services/fleetSpecfication.service');

class FleetSpecificationController extends BaseController {
  constructor() {
    super(fleetSpecService);
    //it will uses parents methods for getbyId and update 
  }  
}

module.exports = new FleetSpecificationController();
