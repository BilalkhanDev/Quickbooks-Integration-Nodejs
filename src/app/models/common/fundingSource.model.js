const mongoose = require('mongoose');
const validator = require("validator");
const { paginate, search } = require('../../shared/plugin');

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coords: { type: [Number], default: [0, 0] },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  aptSuiteRoom: { type: String },
});

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator(value) {
          return /^\+?\d{1,3}-?\d{3}-?\d{4,9}$/.test(value); // Allows 10 to 15 digits only
        },
        message: 'Invalid contact number. It should be 10 to 15 digits long.',
      },
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator(value) {
          return !value || /^\+?\d{1,3}-?\d{3}-?\d{4,9}$/.test(value); // Allows empty or 10-15 digits
        },
        message: 'Invalid phone number. It should be 10 to 15 digits long.',
      },
    },

    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      validate: {
        validator(value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: 'Invalid email format. Please enter a valid email address.',
      },
    },
    timeZone: {
      type: String,
      default: 'America/New_York',
    },
    address: addressSchema,
    profileImageURL: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


schema.plugin(paginate);
schema.plugin(search)
schema.statics.isTitleTaken = async function (title, excludeId) {
  const result = await this.findOne({ title, _id: { $ne: excludeId } });
  return !!result;
};

const Fundingsource = mongoose.model('Fundingsource', schema);

module.exports = Fundingsource;
