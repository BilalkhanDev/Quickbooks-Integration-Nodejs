const Joi = require('joi');
const objectId = require('./objectId.schema');  
const BaseSchema = require('./base.schema');

const PRIORITY_ENUM = [0, 1, 2, 3, 4];
const LABELS_ENUM = [0, 1, 2, 3];

const baseIssueFields = {
  fleet: objectId().required(),  // Fleet ID is required
  service: objectId().required(),  // Service ID is required
  priority: Joi.number().valid(...PRIORITY_ENUM).default(0),  // Priority is a number from the enum
  reportedDate: Joi.date().required(),  // Reported date is required
  summary: Joi.string().required(),  // Summary is required
  description: Joi.string().optional().allow(''),  // Description is optional, can be empty
  labels: Joi.number().valid(...LABELS_ENUM).optional(),  // Labels are optional
  primaryMeter: Joi.number().optional(),  // Primary meter is optional
  void: Joi.boolean().optional(),  // Void is optional
  reportedBy: Joi.string().required(),  // Reported by is required
  assignedTo: Joi.string().optional().allow(''),  // Assigned to is optional
  dueDate: Joi.date().optional(),  // Due date is optional
  primaryMeterDue: Joi.number().optional(),  // Primary meter due is optional
  documents: Joi.array().items(Joi.string()).optional().default([]),  // Documents is an array of strings
};

class IssueSchema extends BaseSchema {
  constructor() {
    super(baseIssueFields); 
  }

  getByServiceId() {
    return {
      params: Joi.object({
        serviceId: objectId().required(),
      }),
    };
  }
}

module.exports = new IssueSchema();
