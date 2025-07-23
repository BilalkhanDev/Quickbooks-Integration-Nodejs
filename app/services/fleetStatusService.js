const fleetDAL = require('../dal/fleetStatusDal');

exports.createStatus = async (data) => {
  if (data.isDefault) {
    await fleetDAL.clearDefaultFlag(); // Ensure only one default
  }
  return await fleetDAL.createFleetStatus(data);
};

exports.getStatuses = async () => {
  return await fleetDAL.getAllStatuses();
};

exports.getStatus = async (id) => {
  return await fleetDAL.getStatusById(id);
};

exports.updateStatus = async (id, data) => {
  if (data.isDefault) {
    await fleetDAL.clearDefaultFlag();
  }
  return await fleetDAL.updateStatusById(id, data);
};

exports.deleteStatus = async (id) => {
  return await fleetDAL.deleteStatusById(id); // already safe
};

exports.bulkDeleteStatuses = async (ids) => {
  const statuses = await fleetDAL.findStatusesByIds(ids);
  const nonRemovables = statuses.filter(s => !s.isRemoveAble);
  if (nonRemovables.length > 0) {
    const names = nonRemovables.map(s => s.name).join(', ');
    throw new Error(`Cannot delete: [${names}] are not removable.`);
  }

  // ✅ Only pass IDs of removable statuses
  const removableIds = statuses
    .filter(s => s.isRemoveAble)
    .map(s => s._id);

  return await fleetDAL.deleteStatusesByIds(removableIds);
};

