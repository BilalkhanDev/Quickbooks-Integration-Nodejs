const Joi = require('joi');
const objectId = require('./objectId.schema');
const BaseSchema = require('./base.schema');
const { REPAIR_PRIORITY_CLASSES, SERVICE_ENTRY_LABLES } = require('../shared/constants/enum');

const lineItemSchema = Joi.object({
  serviceTask: objectId().required(),  // serviceTask is required and must be a valid ObjectId
  maintanceCategories: Joi.object({
    categoryCode: objectId().optional().default(null),  // Optional ObjectId
    systemCode: objectId().optional().default(null),
    assemblyCode: objectId().optional().default(null),
    reasonToRepair: objectId().optional().default(null),
  }).optional(),
  labor: Joi.number().default(0),  // Default to 0 if not provided
  parts: Joi.number().default(0),  // Default to 0 if not provided
});

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
  labels: Joi.number().valid(...SERVICE_ENTRY_LABLES).optional(),  // Labels are optional with validation
  documents: Joi.array().items(Joi.string()).optional().default([]),  // Documents is an array of strings
  comments: Joi.string().allow('').optional(),  // Comments is optional and can be an empty string
  lineItems: Joi.array().items(lineItemSchema).optional(),  // Validate each line item with the defined schema
};

class ServiceEntrySchema extends BaseSchema {
  constructor() {
    super(baseServiceEntryFields);  // Extending base schema
  }
 getByFleetId() {
    return {
      params: Joi.object({
        fleetId: objectId().required(),  // Ensure serviceId is valid
      }),
    };
  }
  getByServiceId() {
    return {
      params: Joi.object({
        serviceId: objectId().required(),  // Ensure serviceId is valid
      }),
    };
  }


  createOrUpdate() {
    return {
      body: Joi.object(baseServiceEntryFields),  // Use the base fields for validation
    };
  }
}

module.exports = new ServiceEntrySchema();
