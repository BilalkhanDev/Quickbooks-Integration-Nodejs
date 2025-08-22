const mongoose = require('mongoose');
const { ROLES_TYPES } = require('../shared/constants/role');
const { paginate, search } = require('../shared/plugin');

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(ROLES_TYPES),
      required: true,
    },

    description: { type: String, required: true },
    permissions: { type: Array, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

 
roleSchema.plugin(paginate);
roleSchema.plugin(search)
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
