const mongoose = require('mongoose');
const FleetType = require('../models/fleetType');

exports.createFleetType = (data) => FleetType.create(data);
exports.getAllFleetTypes = () => FleetType.find();
exports.updateFleetType = (id, data) => FleetType.findByIdAndUpdate(id, data, { new: true });
exports.findFleetTypeById = (id) => FleetType.findById(id);
exports.deleteFleetType = (id) => FleetType.findByIdAndDelete(id);
exports.findFleetTypesByIds = (ids) => {
  const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
  return FleetType.find({ _id: { $in: validIds } });
};
exports.deleteFleetTypesByIds = (ids) => FleetType.deleteMany({ _id: { $in: ids } });
exports.clearDefaultFlag = () => FleetType.updateMany({}, { isDefault: false });
