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
    required: [true, 'Email is required'],
    unique: true,  // Email must remain unique
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value); // Validator function to check if the email is valid
      },
      message: 'Please fill a valid email address', // Error message if validation fails
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
  timeZone: {
    type: String,
    default: 'America/New_York', 
  },
}, {
  timestamps: true,
});

UserSchema.statics.isTitleTaken = async function (username, excludeId) {
  const result = await this.findOne({
    username,
    _id: { $ne: excludeId }
  });
  return !!result;
};

module.exports = mongoose.model('User', UserSchema);
