const engine = require('../models/specfication/engine');
const FleetSpec = require('../models/specfication/index');
const weight = require('../models/specfication/weight');
const wheel = require('../models/specfication/wheel');
const transmission = require('../models/specfication/trasmission');
const { safeRedisGet, setFleetSpecToRedis } = require('../utils/redis');

const subModels = {
  engine,
  wheel,
  transmission,
  weight,
};

const updateOrCreateSubSpec = async (Model, existingSubId, data) => {
  if (!data) return null;

  if (existingSubId) {
    const updated = await Model.findByIdAndUpdate(existingSubId, data, { new: true });
    return updated?._id || null;
  }

  const doc = new Model(data);
  await doc.save();
  return doc._id;
};

const updateFleetSpecAndSubSpecs = async (fleetId, body) => {
   // Get fleetId from URL parameter

  if (!fleetId) {
    throw new Error('FleetId is required.');
  }

  const redisFleetKey = 'fleets:all';

  // STEP 1: Validate Fleet exists in Redis
  const cachedFleetDataRaw = await safeRedisGet(redisFleetKey);

  if (!cachedFleetDataRaw) {
    throw new Error('Fleet data not found in Redis.');
  }

  const cachedFleetData = JSON.parse(cachedFleetDataRaw);
  const matchedFleet = cachedFleetData.find(f => f._id === fleetId);

  if (!matchedFleet) {
    throw new Error(`No fleet found in Redis with fleetId: ${fleetId}`);
  }

  // STEP 2: Check if FleetSpec exists in MongoDB
  const existingFleetSpec = await FleetSpec.findOne({ fleetId });
  const updates = {};

  // Loop through sub-models (engine, wheel, transmission, weight)
  for (const key of Object.keys(subModels)) {
    const model = subModels[key];
    const data = body[key];
    const existingSubId = existingFleetSpec?.[key];
    updates[key] = await updateOrCreateSubSpec(model, existingSubId, data);
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

  // Optional: Update Redis with the new fleet spec
  await setFleetSpecToRedis(fleetId, updatedFleetSpec);

  return updatedFleetSpec;
};

module.exports = {
  updateFleetSpecAndSubSpecs,
};
