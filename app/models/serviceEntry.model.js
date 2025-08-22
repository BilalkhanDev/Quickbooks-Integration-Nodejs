const mongoose = require('mongoose');
const { search, paginate } = require('../shared/plugin');

// Define the lineItemSchema
const lineItemSchema = new mongoose.Schema(
  {
    serviceTask: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceTask' },
    maintanceCategories: {
      categoryCode: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryCode', default: null },
      systemCode: { type: mongoose.Schema.Types.ObjectId, ref: 'SystemCode', default: null },
      assemblyCode: { type: mongoose.Schema.Types.ObjectId, ref: 'AssemblyCode', default: null },
      reasonToRepair: { type: mongoose.Schema.Types.ObjectId, ref: 'ReasonCode', default: null },
    },
    labor: { type: String, default: 0 },
    parts: { type: String, default: 0 },
  },
  {
    timestamps: false,
  }
);

// Define the serviceEntrySchema
const serviceEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fleet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fleet',
      required: true,
    },
    lineItems: [lineItemSchema],
    repairPriorityClass: {
      type: String,
      enum: [0, 1, 2],
      required: true,
    },
    odometer: {
      type: Number,
      default: 0,
    },
    void: {
      type: Boolean,
      default: false,
    },
    completionDate: {
      type: Date,
      required: true,
    },
    startDate: {
      type: Date,
      default: null,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor',
    },
    reference: {
      type: String,
      default: '',
    },
    labels: {
      type: Number,
      enum: [0, 1, 2, 3],
    },
    documents: [{ type: String }],
    comments: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

serviceEntrySchema.post('findOne', async function(entry) {
  if (!entry) return; // If no entry is found, do nothing.

  entry.lineItems.forEach(lineItem => {
    if (lineItem.serviceTask) {
      // Override maintanceCategories in serviceTask with lineItems' maintanceCategories
      lineItem.serviceTask.maintanceCategories = lineItem.maintanceCategories;

      // Delete maintanceCategories from lineItems after overriding
      lineItem.maintanceCategories = undefined;
    }
  });
});

// Post-find middleware for find
serviceEntrySchema.post('find', function(entries) {
  entries.forEach(entry => {
    entry.lineItems.forEach(lineItem => {
      if (lineItem.serviceTask) {
        // Override maintanceCategories in serviceTask with lineItems' maintanceCategories
        lineItem.serviceTask.maintanceCategories = lineItem.maintanceCategories;

        // Delete maintanceCategories from lineItems after overriding
        lineItem.maintanceCategories = undefined;
      }
    });
  });
});

// Virtual for issues count
serviceEntrySchema.virtual('issues', {
  ref: 'Issues',
  localField: '_id',
  foreignField: 'service',
  justOne: false,
});

serviceEntrySchema.virtual('issuesCount', {
  ref: 'Issues',
  localField: '_id',
  foreignField: 'service',
  count: true,
  match: { void: false }, // Only count non-voided issues
});

// Add plugins
serviceEntrySchema.plugin(search);
serviceEntrySchema.plugin(paginate);

// Create the ServiceEntry model
const ServiceEntry = mongoose.model('ServiceEntry', serviceEntrySchema);

// Export the model
module.exports = ServiceEntry;
