// services/issue.service.js

const GenericService = require('./generic.service');
const ApiError = require('../shared/core/exceptions/ApiError');
const { default: HttpStatus } = require('http-status');
const { InspectionSchedule, Inspection } = require('../models');


class InspectionScheduleService extends GenericService {
    constructor() {
        super(InspectionSchedule);
    }

    async create(req) {
        const data = req.body;
        const userId = req.user.id;
        const payload = {
            user: userId,
            ...data
        }
        const result = new this.model(payload);
        await result.save();
        return result;
    }



    async getAll(fleetId) {
        const inspections = await Inspection.aggregate([
            {
                $lookup: {
                    from: 'inspectionschedules',
                    let: { inspectionId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$inspection', '$$inspectionId'] },
                                        { $eq: ['$fleet', new ObjectId(fleetId)] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                frequency: 1,
                                frequency_count: 1,
                                submission_schedule: 1,
                                status: 1,
                                createdAt: 1,
                                updatedAt: 1
                            }
                        }
                    ],
                    as: 'schedule'
                }
            },
            {
                $unwind: {
                    path: '$schedule',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    description: 1,
                    status: 1,
                    sections: 1,
                    items: 1,
                    schedule: 1
                }
            }
        ]);

        return inspections;
    }



}

module.exports = new InspectionScheduleService();
