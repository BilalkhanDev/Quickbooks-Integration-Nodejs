const Joi = require('joi');
const objectId = require('./objectId.schema');  
const BaseSchema = require('./base.schema');  

const REPAIR_PRIORITY_CLASSES = [0, 1, 2];
const LABELS = [0, 1, 2, 3];

const baseServiceEntryFields = {
  fleet: objectId().required(),  // Fleet ID is required
  repairPriorityClass: Joi.number()
    .valid(...REPAIR_PRIORITY_CLASSES)
    .required(),  // Repair priority class is required with enum validation
  odometer: Joi.number().default(0),  // Default to 0 if not provided
  void: Joi.boolean().default(false),  // Default to false if not provided
  completionDate: Joi.date().required(),  // Completion date is required
  startDate: Joi.date().allow(null).optional(),  // Start date is optional
  vendor: objectId().optional(),  // Vendor is optional
  reference: Joi.string().allow('').optional(),  // Reference is optional and can be an empty string
  labels: Joi.number().valid(...LABELS).optional(),  // Labels are optional with validation
  documents: Joi.array().items(Joi.string()).optional().default([]),  // Documents is an array of strings
  comments: Joi.string().allow('').optional(),  // Comments is optional and can be an empty string
};

class ServiceEntrySchema extends BaseSchema {
  constructor() {
    super(baseServiceEntryFields);  
  }

  getByServiceId() {
    return {
      params: Joi.object({
        serviceId: objectId().required(),
      }),
    };
  }
}

module.exports = new ServiceEntrySchema();
