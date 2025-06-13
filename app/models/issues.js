const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
    {
        assetId: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: [0, 1, 2, 3, 4],
            default: 0,
        },
        reportedDate: {
            type: Date,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        labels: {
            type: Number,
            enum: [0, 1, 2, 3],


        },
        primaryMeter: {
            type: Number,
        },
        void: {
            type: Boolean,
            default: false,
        },
        reportedBy: {
            type: String,
            required: true,
        },
        assignedTo: {
            type: String,
        },
        dueDate: {
            type: Date,
        },
        primaryMeterDue: {
            type: Number,
        },
        photos: [{
            type: String, 
        }],
        documents: [{
            type: String, 
        }],
    },
    {
        timestamps: true, 
    }
);

const Issues = mongoose.model('Issue', issueSchema);

module.exports = Issues;
