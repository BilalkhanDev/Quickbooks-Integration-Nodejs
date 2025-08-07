const mongoose = require('mongoose');
const { search, paginate } = require('../shared/plugin');

const issueSchema = new mongoose.Schema(
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
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceEntry',
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
        documents: [{
            type: String,
        }],
    },
    {
        timestamps: true,
    }
);
issueSchema.plugin(search)
issueSchema.plugin(paginate)

const Issues = mongoose.model('Issues', issueSchema);

module.exports = Issues;
