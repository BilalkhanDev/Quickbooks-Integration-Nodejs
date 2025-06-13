const mongoose = require('mongoose');
const serviceEntrySchema = new mongoose.Schema(
    {
        fleetId: {
            type: String,
            required: true,
            unique: true,
        },
        repairPriorityClass: {
            type: String,
            enum: [0, 1, 2],
            //   enum: ['Scheduled', 'Non-Scheduled', 'Emergency'],
            required: true,

        },
        odometer: {
            type: Number,
            default: null,
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
            ref: 'Vendor'
        },
        reference: {
            type: String,
            default: ""
        },
        labels: {
            type: Number,
            enum: [0, 1, 2, 3],
        },
        issues: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issues'
        },
        photos: [{
            type: String,
        }],
        documents: [{
            type: String,
        }],
        comments: {
            type: String,
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
    }
);

// Create the model from the schema
const ServiceEntry = mongoose.model('ServiceEntry', serviceEntrySchema);

module.exports = ServiceEntry;
