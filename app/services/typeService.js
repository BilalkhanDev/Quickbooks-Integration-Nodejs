const typeDAL = require('../dal/typeDal');

exports.createFleetType = async (data) => {
  if (data.isDefault) {
    await typeDAL.clearDefaultFlag();
  }
  return await typeDAL.createFleetType(data);
};

exports.getAllFleetTypes = () => typeDAL.getAllFleetTypes();

exports.updateFleetType = async (id, data) => {
  const existing = await typeDAL.findFleetTypeById(id);
  if (!existing) throw new Error('FleetType not found');

  if (data.isDefault) {
    await typeDAL.clearDefaultFlag();
  }

  return await typeDAL.updateFleetType(id, data);
};

exports.deleteFleetType = async (id) => {
  const type = await typeDAL.findFleetTypeById(id);
  if (!type) throw new Error('FleetType not found');
  if (!type.isRemoveAble) throw new Error(`Cannot delete '${type.name}' as it is not removable`);
  return await typeDAL.deleteFleetType(id);
};

exports.bulkDeleteFleetTypes = async (ids) => {
  const types = await typeDAL.findFleetTypesByIds(ids);
  const nonRemovables = types.filter(t => !t.isRemoveAble);
  if (nonRemovables.length > 0) {
    const names = nonRemovables.map(t => t.name).join(', ');
    throw new Error(`Cannot delete: ${names} are not removable`);
  }

  const removableIds = types.filter(t => t.isRemoveAble).map(t => t._id);
  return await typeDAL.deleteFleetTypesByIds(removableIds);
};
