const mongoose = require('mongoose');

const ItemValueSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed
}, { _id: false });

const InspectionSubmissionSchema = new mongoose.Schema({
  inspectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inspection',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fleet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fleet',
    required: true
  },
  inspectedBy: {
    userId: { type: String, required: true },
    name: { type: String },
    email: { type: String }
  },
  itemValues: [ItemValueSchema],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('InspectionSubmission', InspectionSubmissionSchema); 