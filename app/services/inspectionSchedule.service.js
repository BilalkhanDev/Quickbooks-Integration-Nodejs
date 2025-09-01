// services/issue.service.js

const GenericService = require('./generic.service');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const { InspectionSchedule, Inspection } = require('../models');
const { default: mongoose } = require('mongoose');


class InspectionScheduleService extends GenericService {
    constructor() {
        super(InspectionSchedule);
    }
    async getAll(fleetId) {
        const fleetObjectId = mongoose.isValidObjectId(fleetId)
            ? new mongoose.Types.ObjectId(fleetId)
            : (() => { throw new Error('Invalid fleetId'); })();

        const schedulesColl = this.model.collection.name;

        const defaultSchedule = {
            frequency: null,
            frequency_count: 0,
            submission_schedule: [],
            status: 'non-scheduled',
            createdAt: null,
            updatedAt: null,
        };

        const inspections = await Inspection.aggregate([
            {
                $lookup: {
                    from: schedulesColl,
                    let: { inspection: '$_id', fleetId: fleetObjectId },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$inspection', '$$inspection'] },
                                        { $eq: ['$fleet', '$$fleetId'] },
                                    ],
                                },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                frequency: 1,
                                frequency_count: 1,
                                submission_schedule: 1,
                                status: 1,
                                createdAt: 1,
                                updatedAt: 1,
                            },
                        },
                    ],
                    as: 'scheduleDocs',
                },
            },
            {
                $addFields: {
                    schedule: {
                        $ifNull: [{ $first: '$scheduleDocs' }, defaultSchedule],
                    },
                },
            },
            { $project: { scheduleDocs: 0 } },

            // ✨ Only return id, name, description, schedule
            {
                $project: {
                    _id: 0,
                    id: '$_id',
                    name: 1,
                    description: 1,
                    schedule: 1,
                },
            },
        ]);

        return inspections;
    }
    async createOrUpdate(req) {
        const { fleet, inspection } = req.body
        return await this.model.findOneAndUpdate(
            { fleet, inspection },
            { $set: req.body },
            { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
        );
    }
    async getById(id) {
        const data = await this.model.findOne({ inspection: id });
        return data
    }




}

module.exports = new InspectionScheduleService();
