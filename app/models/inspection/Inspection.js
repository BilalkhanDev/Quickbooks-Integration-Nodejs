const mongoose = require('mongoose');

// Section schema for flattened structure
const SectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true,

  },
  name: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  parentSectionId: {
    type: String,
    default: null
  }
}, { _id: true });

// Item schema for flattened structure
const ItemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'checkbox', 'dropdown', 'date', 'photo', 'signature', 'meter']
  },
  value: {
    type: String,
    default: ''
  },
  sectionId: {
    type: String,
    default: null
  },
  order: {
    type: Number,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  options: {
    type: mongoose.Schema.Types.Mixed,
    default: undefined
  }
}, { _id: true });

const InspectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  
  },
  description: {
    type: String,
    default: ''
  },
  sections: [SectionSchema],
  items: [ItemSchema],

  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  },

}, {
  timestamps: true
});

module.exports = mongoose.model('Inspection', InspectionSchema);



