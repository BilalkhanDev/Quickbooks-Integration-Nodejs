const mongoose = require('mongoose');
const { search, paginate } = require('../shared/plugin');
const serviceEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fleet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fleet',
      required: true,
    },
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
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

  }
);

// Define the virtual for issues
serviceEntrySchema.virtual('issues', {
  ref: 'Issues', // Reference the Issues model
  localField: '_id', // Field in ServiceEntry model
  foreignField: 'service', // Field in Issues model that references ServiceEntry
  justOne: false, // Return an array of issues
});
serviceEntrySchema.virtual('issuesCount', {
  ref: 'Issues',
  localField: '_id',
  foreignField: 'service',
  count: true, // Return count instead of documents
  match: { void: false } // Only count non-voided issues
});
serviceEntrySchema.plugin(search);
serviceEntrySchema.plugin(paginate);

const ServiceEntry = mongoose.model('ServiceEntry', serviceEntrySchema);

module.exports = ServiceEntry;

