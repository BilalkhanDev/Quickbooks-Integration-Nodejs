const { Vendor } = require("../models");

class VendorService {
  async create(data) {
    const vendor = new Vendor(data);
    return await vendor.save();
  }

  async getAll(query) {
    const {
      page = 1,
      limit = 10,
      name,
      classification,
      labels,
      contactName,
    } = query;

    const filters = {};

    if (name) filters.name = { $regex: name, $options: 'i' };
    if (classification) filters.classification = classification;
    if (contactName) filters.contactName = { $regex: contactName, $options: 'i' };
    if (labels) filters.labels = { $in: Array.isArray(labels) ? labels : [labels] };

    const skip = (page - 1) * limit;

    const [vendors, total] = await Promise.all([
      Vendor.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Vendor.countDocuments(filters),
    ]);

    return {
      data: vendors,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    };
  }

  async update(id, data) {
    const updated = await Vendor.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new Error('Vendor not found');
    return updated;
  }

  async delete(id) {
    const deleted = await Vendor.findByIdAndDelete(id);
    if (!deleted) throw new Error('Vendor not found');
    return deleted;
  }

  async bulkDelete(ids) {
    if (!Array.isArray(ids)) throw new Error('IDs must be an array');
    const result = await Vendor.deleteMany({ _id: { $in: ids } });
    return result;
  }
}

module.exports = new VendorService();
