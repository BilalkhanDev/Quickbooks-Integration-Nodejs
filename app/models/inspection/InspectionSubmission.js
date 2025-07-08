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
  fleetId: { type: String, required: true },
  inspectedBy: {
    userId: { type: String, required: true },
    name: { type: String },
    email: { type: String }
  },
  inspectionDate: { type: Date, default: Date.now },
  itemValues: [ItemValueSchema],
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('InspectionSubmission', InspectionSubmissionSchema); 