const engine = require('../models/specfication/engine');
const FleetSpec = require('../models/specfication/index');
const weight = require('../models/specfication/weight');
const wheel = require('../models/specfication/wheel');
const transmission = require('../models/specfication/trasmission');
// const FuelEconomy=require("../models/specfication/")
const { safeRedisGet, setFleetSpecToRedis } = require('../utils/redis');

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
      // Update existing sub-spec
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

  const redisFleetKey = 'fleets:all';

  const cachedFleetDataRaw = await safeRedisGet(redisFleetKey);

  if (cachedFleetDataRaw) {
    const cachedFleetData = JSON.parse(cachedFleetDataRaw);
    const matchedFleet = cachedFleetData.find(f => f === fleetId);

    if (!matchedFleet) {
      throw new Error(`No fleet found in Redis with fleetId: ${fleetId}`);
    }

    // STEP 2: Check if FleetSpec exists in MongoDB
    const existingFleetSpec = await FleetSpec.findOne({ fleetId });
    const updates = {};

    // Loop through the sub-models in the body and update only the ones provided
    for (const key of Object.keys(subModels)) {
      const model = subModels[key];
      const data = body[key];

      if (data) {
        // If data is provided for this key, update or create the sub-spec
        const existingSubId = existingFleetSpec ? existingFleetSpec[key] : null;
        updates[key] = await updateOrCreateSubSpec(model, existingSubId, data);
      } else if (existingFleetSpec && existingFleetSpec[key]) {
        // If data is not provided, keep the existing sub-spec
        updates[key] = existingFleetSpec[key];
      }
    }

    let updatedFleetSpec;

    if (!existingFleetSpec) {
      // If FleetSpec doesn't exist, create a new one
      const newFleetSpec = new FleetSpec({
        fleetId,  // Store fleetId along with sub-specs
        ...updates,
      });

      await newFleetSpec.save();
      updatedFleetSpec = await FleetSpec.findById(newFleetSpec._id).populate(Object.keys(subModels));
    } else {
      // If FleetSpec exists, update the document
      updatedFleetSpec = await FleetSpec.findOneAndUpdate(
        { fleetId },
        { ...updates },
        { new: true }
      ).populate(Object.keys(subModels));
    }

    return updatedFleetSpec;
  } else {
    throw new Error('Fleet data not found in Redis.');
  }
};

module.exports = {
  updateFleetSpecAndSubSpecs,
};




