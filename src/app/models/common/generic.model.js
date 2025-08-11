const mongoose = require('mongoose');
const { paginate, search } = require('../../shared/plugin');


class GenericCommonModel {
  constructor() {
    this.schema = mongoose.Schema(
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
        isActive: {
          type: Boolean,
          default: false,
        },
      },
      {
        timestamps: true,
      }
    );
    this.schema.plugin(paginate);
    this.schema.plugin(search);
  }

  // Method to check if title is taken (can be used in any subclass)
  static async isTitleTaken(title, excludeId) {
    const result = await this.findOne({ title, _id: { $ne: excludeId } });
    return !!result;
  }
}

module.exports = GenericCommonModel;
