const mongoose = require('mongoose');
const { paginate, search } = require('../plugin');

const equipmentSchema = mongoose.Schema(
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
    code: {
      type: String,
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


equipmentSchema.plugin(paginate);
equipmentSchema.plugin(search)
equipmentSchema.statics.isTitleTaken = async function (title, exclude) {
  const result = await this.findOne({ title, _id: { $ne: exclude } });
  return !!result;
};


const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
