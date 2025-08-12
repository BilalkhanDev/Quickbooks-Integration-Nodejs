// services/fleetSpecification.service.js
const { Specification } = require('../models');
const dimensionModel = require('../models/specification/dimension.model');
const engineModel = require('../models/specification/engine.model');
const fuelModel = require('../models/specification/fuel.model');
const performanceModel = require('../models/specification/performance.model');
const weightModel = require('../models/specification/weight.model');
const wheelModel = require('../models/specification/wheel.model');
const transmissionModel = require('../models/specification/trasmission.model');
const ApiError = require('../shared/core/exceptions/ApiError');

class FleetSpecificationService {
  constructor() {
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
      return await model.findByIdAndUpdate(existingSubId, data, { new: true });
    }

    const newSub = new model(data);
    await newSub.save();
    return newSub._id;
  }

  async update(fleetId, body) {
    if (!fleetId) {
      throw new ApiError(400, 'Fleet ID is required');
    }

    const existingFleetSpec = await Specification.findOne({ fleetId });
    const updates = {};

    for (const key of Object.keys(this.subModels)) {
      const model = this.subModels[key];
      const data = body[key];
      const existingSubId = existingFleetSpec ? existingFleetSpec[key] : null;
      updates[key] = await this.updateOrCreateSubSpec(model, existingSubId, data);
    }

    let updated;

    if (!existingFleetSpec) {
      const newFleetSpec = new Specification({ fleetId, ...updates });
      await newFleetSpec.save();
      updated = await Specification.findById(newFleetSpec._id).populate(Object.keys(this.subModels));
    } else {
      updated = await Specification.findOneAndUpdate({ fleetId }, updates, { new: true })
        .populate(Object.keys(this.subModels));
    }

    return updated;
  }

  async getFleetSpec(fleetId) {
    const specs = await Specification.find({ fleetId })
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
