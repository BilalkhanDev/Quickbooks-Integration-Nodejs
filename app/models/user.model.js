const mongoose = require('mongoose');
const validator = require('validator'); 
const { USER_ROLES } = require('../shared/constants/role');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    maxlength: 255,
  },
  role: {
    type: Number,
    default: USER_ROLES.USER, 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
