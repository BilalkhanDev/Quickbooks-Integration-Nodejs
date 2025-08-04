module.exports = {
  findById: async (Model, id, projection = null, options = {}) => {
    return await Model.findById(id, projection, options);
  },

  findOne: async (Model, filter = {}, projection = null, options = {}) => {
    return await Model.findOne(filter, projection, options);
  },

  findAll: async (Model, filter = {}, projection = null, options = {}) => {
    return await Model.find(filter, projection, options);
  },

  create: async (Model, payload) => {
    return await Model.create(payload);
  },

  updateById: async (Model, id, payload, options = { new: true }) => {
    return await Model.findByIdAndUpdate(id, payload, options);
  },

  deleteById: async (Model, id) => {
    return await Model.findByIdAndDelete(id);
  }
};
