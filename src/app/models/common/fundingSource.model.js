const mongoose = require('mongoose');
const GenericModel = require('./generic.model'); 

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coords: { type: [Number], default: [0, 0] },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
  aptSuiteRoom: { type: String },
});

const fundingsourceSchema = new GenericModel().schema; 
fundingsourceSchema.add({
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
        return !value || /^\+?\d{1,3}-?\d{3}-?\d{4,9}$/.test(value); 
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
});

const Fundingsource = mongoose.model('Fundingsource', fundingsourceSchema);

module.exports = Fundingsource;
