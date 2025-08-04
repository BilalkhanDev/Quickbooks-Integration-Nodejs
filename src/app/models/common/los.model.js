const mongoose = require('mongoose');
const { paginate, search } = require('../../../shared/plugin');

const losSchema = mongoose.Schema(
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
    profileImageURL: {
      type: String,
      required: false,
      default: '',
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


losSchema.plugin(paginate);
losSchema.plugin(search)
losSchema.statics.isTitleTaken = async function (title, excludeLOSId) {
  const los = await this.findOne({ title, _id: { $ne: excludeLOSId } });
  return !!los;
};
const LOS = mongoose.model('LOS', losSchema);

module.exports = LOS;
