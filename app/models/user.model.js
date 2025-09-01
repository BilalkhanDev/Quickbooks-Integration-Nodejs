// /models/user.model.js
const mongoose = require('mongoose');
const validator = require('validator');

const { search, paginate } = require('../shared/plugin');
const { PaswordHasher } = require('../shared/security');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Please fill a valid email address',
      },
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
      // select: false, // do not return by default
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    timeZone: {
      type: String,
      default: 'America/New_York',
      trim: true,
    },
    profileImageURL: {
      type: String,
      default: '',
      trim: true,
    },
    contactNumber: { type: String, default: '', trim: true },
  },
  {
    timestamps: true,
  }
);

// Uniqueness helpers
UserSchema.statics.isTitleTaken = async function (username, excludeId) {
  const result = await this.findOne({ username, _id: { $ne: excludeId } });
  return !!result;
};
UserSchema.statics.isEmailTaken = async function (email, excludeId) {
  const result = await this.findOne({ email, _id: { $ne: excludeId } });
  return !!result;
};

UserSchema.plugin(search, {
  refFields: { role: ['name'] },
});
UserSchema.plugin(paginate);

// Hash before save (create or save with changed password)
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {

    this.password = await PaswordHasher.hash(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Hash on findOneAndUpdate if password is present
UserSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate() || {};
  // Support $set usage and direct paths
  const newPassword =
    (update.$set && update.$set.password) !== undefined
      ? update.$set.password
      : update.password;

  if (!newPassword) return next(); // nothing to hash

  try {
    const hashed = await PaswordHasher.hash(newPassword);

    if (update.$set && update.$set.password !== undefined) {
      update.$set.password = hashed;
    } else {
      update.password = hashed;
    }
    this.setUpdate(update);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('User', UserSchema);
