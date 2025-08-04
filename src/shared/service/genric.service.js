class GenericService {
  static async findById(Model, id, projection = null, options = {}) {
    return await Model.findById(id, projection, options);
  }

  static async findOne(Model, filter = {}, projection = null, options = {}) {
    return await Model.findOne(filter, projection, options);
  }

  static async findAll(Model, filter = {}, projection = null, options = {}) {
    return await Model.find(filter, projection, options);
  }

  static async create(Model, data) {
    return await Model.create(data);
  }

  static async updateById(Model, id, updateData, options = { new: true }) {
    return await Model.findByIdAndUpdate(id, updateData, options);
  }

  static async deleteById(Model, id) {
    return await Model.findByIdAndDelete(id);
  }
}

module.exports = GenericService;
