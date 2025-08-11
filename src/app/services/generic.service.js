class GenericService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const document = new this.model(data);
    return await document.save();
  }
  

  async findById(id) {
    return await this.model.findById(id);
  }

  async findOne(filter) {
    return await this.model.findOne(filter);
  }

  async update(id, update) {
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async createOrUpdate(filter, data) {
    const existingDocument = await this.model.findOne(filter);

    if (existingDocument) {
      return await this.model.findByIdAndUpdate(existingDocument._id, data, { new: true });
    } else {
      const document = new this.model(data);
      return await document.save();
    }
  }
}

module.exports = GenericService;

