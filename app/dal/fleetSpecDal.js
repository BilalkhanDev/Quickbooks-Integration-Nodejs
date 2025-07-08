const engine = require('../models/specfication/engine');
const FleetSpec = require('../models/specfication/index');
const weight = require('../models/specfication/weight');
const wheel = require('../models/specfication/wheel');
const transmission = require('../models/specfication/trasmission');
// const FuelEconomy=require("../models/specfication/")


const subModels = {
  engine: engine,       
  wheel: wheel,           
  transmission: transmission,
  weight: weight,           
  // fuelEconomy: FuelEconomy,
};

const updateOrCreateSubSpec = async (model, existingSubId, data) => {
  if (data) {

    if (existingSubId) {
    
      return model.findByIdAndUpdate(existingSubId, { ...data }, { new: true });
    } else {
      // Create new sub-spec
      const newSubSpec = new model(data);
      await newSubSpec.save();
      return newSubSpec;
    }
  } else {
    return existingSubId; 
  }
};

const updateFleetSpecAndSubSpecs = async (fleetId, body) => {
 
  if (!fleetId) {
    throw new Error('FleetId is required.');
  }
  
    const existingFleetSpec = await FleetSpec.findOne({ fleetId });
    const updates = {};


    for (const key of Object.keys(subModels)) {
      const model = subModels[key];
      const data = body[key];

      if (data) {
  
        const existingSubId = existingFleetSpec ? existingFleetSpec[key] : null;
        updates[key] = await updateOrCreateSubSpec(model, existingSubId, data);
      } else if (existingFleetSpec && existingFleetSpec[key]) {
    
        updates[key] = existingFleetSpec[key];
      }
    }

    let updatedFleetSpec;

    if (!existingFleetSpec) {

      const newFleetSpec = new FleetSpec({
        fleetId,  
        ...updates,
      });

      await newFleetSpec.save();
      updatedFleetSpec = await FleetSpec.findById(newFleetSpec._id).populate(Object.keys(subModels));
    } else {
     
      updatedFleetSpec = await FleetSpec.findOneAndUpdate(
        { fleetId },
        { ...updates },
        { new: true }
      ).populate(Object.keys(subModels));
    }

    return updatedFleetSpec;
  
};
const getFleetSpecs = async (fleetId) => {
  try {

    const specs = await FleetSpec.find({ fleetId })
      .populate("engine")
      .populate("wheel")
      .populate("transmission")
      .populate("weight")
      .populate("fuelEconomy");

    const fleetSpec = specs.length ? specs[0].toJSON() : null;
    console.log(fleetId,specs)
    return fleetSpec
  } catch (error) {
    console.error("❌ Error in fetchFleetSpecs:", error.message);
    throw new Error("❌ Error in fetchFleetSpecs:", error.message);
  }
};

module.exports = {
  updateFleetSpecAndSubSpecs,
  getFleetSpecs
};




