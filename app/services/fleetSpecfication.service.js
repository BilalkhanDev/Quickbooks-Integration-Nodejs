const { Specification } = require('../models');
const dimensionModel = require('../models/specification/dimension.model');
const engineModel = require('../models/specification/engine.model');
const fuelModel = require('../models/specification/fuel.model');
const performanceModel = require('../models/specification/performance.model');
const weightModel = require('../models/specification/weight.model');
const wheelModel = require('../models/specification/wheel.model');
const transmissionModel = require('../models/specification/trasmission.model');
const ApiError = require('../shared/core/exceptions/ApiError');
const GenericService = require('./generic.service');

const { default: HttpStatus } = require('http-status');
class FleetSpecificationService extends GenericService {
  constructor() {
    super(Specification);
    this.subModels = {
      engine: engineModel,
      wheel: wheelModel,
      transmission: transmissionModel,
      weight: weightModel,
      fuel: fuelModel,
      performance: performanceModel,
      dimension: dimensionModel,
    };
  }

  async updateOrCreateSubSpec(model, existingSubId, data) {
    if (!data) return existingSubId;

    if (existingSubId) {
      return model.findByIdAndUpdate(existingSubId, data, { new: true });
    }

    const newSub = new model(data);
    await newSub.save();
    return newSub._id;
  }

  async update(fleetId, body) {
    if (!fleetId) {
      throw new ApiError(HttpStatus.NOT_FOUND, 'Fleet ID is required');
    }

    const existingFleetSpec = await this.model.findOne({ fleetId });
    const updates = {};

    for (const key of Object.keys(this.subModels)) {
      const model = this.subModels[key];
      const data = body[key];
      const existingSubId = existingFleetSpec ? existingFleetSpec[key] : null;
      updates[key] = await this.updateOrCreateSubSpec(model, existingSubId, data);
    }

    let updated;

    if (!existingFleetSpec) {
      const newFleetSpec = new this.model({ fleetId, ...updates });
      await newFleetSpec.save();
      updated = await this.model.findById(newFleetSpec._id).populate(Object.keys(this.subModels));
    } else {
      updated = await this.model.findOneAndUpdate({ fleetId }, updates, { new: true }).populate(Object.keys(this.subModels));
    }

    return updated;
  }

  async getFleetSpec(fleetId) {
    const specs = await this.model.find({ fleetId })
      .populate('engine')
      .populate('wheel')
      .populate('transmission')
      .populate('weight')
      .populate('fuel')
      .populate('performance')
      .populate('dimension');

    return specs.length ? specs[0].toJSON() : null;
  }
}

module.exports = new FleetSpecificationService();
