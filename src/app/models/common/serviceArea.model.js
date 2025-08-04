const mongoose = require('mongoose');
const { paginate, search } = require('../../../shared/plugin');


const schema = mongoose.Schema(
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
    zipCodes: [
      {
        type: [String],
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


schema.plugin(paginate);
schema.plugin(search)
schema.statics.isTitleTaken = async function (title, excludeId) {
  const result = await this.findOne({ title, _id: { $ne: excludeId } });
  return !!result;
};
const ServiceArea = mongoose.model('ServiceArea', schema);

module.exports = ServiceArea;
