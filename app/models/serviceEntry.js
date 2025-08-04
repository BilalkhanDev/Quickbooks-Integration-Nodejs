const mongoose = require('mongoose');

const serviceEntrySchema = new mongoose.Schema(
    {
        fleetId: {
            type: String,
            required: true,
        },
        repairPriorityClass: {
            type: String,
            enum: [0,1,2],
            required: true,
        },
        odometer: {
            type: Number,
            default: 0,
        },
        void: {
            type: Boolean,
            default: false, // Whether the service entry is voided
        },
        completionDate: {
            type: Date,
            required: true, // Cannot be blank
        },
        isStartDate: {
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Date,
            default: null
        },
        vendor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor',
        },
        reference: {
            type: String,
            default: "",
        },
        labels: {
            type: Number,
            enum: [0, 1, 2, 3],
        },
        documents: [{
            type: String,
        }],
        comments: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
    }
);

// Virtual populate for issues
serviceEntrySchema.virtual('issues', {
    ref: 'Issues',
    localField: '_id',
    foreignField: 'serviceId'
});

// Ensure virtual fields are serialized when converting to JSON
serviceEntrySchema.set('toJSON', { virtuals: true });
serviceEntrySchema.set('toObject', { virtuals: true });

// Create the model from the schema
const ServiceEntry = mongoose.model('ServiceEntry', serviceEntrySchema);

module.exports = ServiceEntry;