const mongoose = require('mongoose');
const InspectionItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'checkbox', 'datetime', 'photo', 'signature', 'section'], 
  },
  required: {
    type: Boolean,
    default: false, 
  },
  order: {
    type: Number,
    required: true, 
  },
  value: {
    type: mongoose.Schema.Types.Mixed, 
    default: null, 
  },
  description: {
    type: String,
    default: '', 
  },
  options: {
    type: Map,
    of: String,
    default: {},
  },

  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InspectionItem'
  }]
}, {
  _id: true, 
  timestamps: true,
});

const InspectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  description: {
    type: String,
    default: '', 
  },
  items: [InspectionItemSchema], 
  assignedTo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'in-progress'], // Possible statuses
    default: 'pending', 
  },
  assetId: {
    type: String,
    // required: true, // You can enable this if asset ID is mandatory
  },
  inspector: {
    name: {
      type: String,
      // required: true, // Inspector's name is required
    },
    role: {
      type: String,
      default: 'Inspector', // Default role is 'Inspector'
    },
    email: {
      type: String,
      // required: false, // Email is optional
    },
    signature: {
      type: String,
      required: false, // Optional base64 signature for the inspector
    },
  },
}, {
  timestamps: true, // Automatically create `createdAt` and `updatedAt`
});

module.exports = mongoose.model('Inspection', InspectionSchema);
