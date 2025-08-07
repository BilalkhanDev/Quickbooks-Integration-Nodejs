const mongoose = require('mongoose');
const { paginate, search } = require('../../shared/plugin');


const spaceTypesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    los: { type: mongoose.Schema.ObjectId, ref: 'LOS' },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    loadTime: {
      type: String,
      required: true,

    },
    unloadTime: {
      type: String,
      required: true,
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

spaceTypesSchema.plugin(paginate);
spaceTypesSchema.plugin(search);
spaceTypesSchema.statics.isTitleTaken = async function (title, excludeLOSId) {
  const spaceType = await this.findOne({ title, _id: { $ne: excludeLOSId } });
  return !!spaceType;
};

const SpaceType = mongoose.model('SpaceType', spaceTypesSchema);

module.exports = SpaceType;
