const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  isError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: null,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  ipAddress: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ActivityModel', ActivityLogSchema);
