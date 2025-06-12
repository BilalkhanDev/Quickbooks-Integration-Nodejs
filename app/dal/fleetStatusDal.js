const { default: mongoose } = require('mongoose');

const fleetStatus = require('../models/fleetStatus');

exports.createFleetStatus = (data) => fleetStatus.create(data);

exports.getAllStatuses = () => fleetStatus.find();

exports.getStatusById = (id) => fleetStatus.findById(id);

exports.updateStatusById = (id, update) => FleetStatus.findByIdAndUpdate(id, update, { new: true });

exports.deleteStatusById = async (id) => {
  const status = await fleetStatus.findById(id);
  if (!status) throw new Error("Status not found");

  if (!status?.isRemoveAble) {
    throw new Error(`Status '${status.name}' is not removable.`);
  }

  return await fleetStatus.findByIdAndDelete(id);
};


exports.clearDefaultFlag = () => fleetStatus.updateMany({}, { isDefault: false });

exports.countStatuses = () => fleetStatus.countDocuments();

// DAL
exports.findStatusesByIds = (ids) => {
  console.log("Ids", ids);
  const objectIds = ids
    .filter(id => mongoose.Types.ObjectId.isValid(id))
    .map(id => new mongoose.Types.ObjectId(id));

  console.log("Converted ObjectIds", objectIds);

  return fleetStatus.find({ _id: { $in: objectIds } });
};


exports.deleteStatusesByIds = (ids) => fleetStatus.deleteMany({ _id: { $in: ids } });
