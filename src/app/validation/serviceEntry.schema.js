const Joi = require('joi');
const objectId = require('./objectId.schema');

// Enums
const REPAIR_PRIORITY_CLASSES = [0, 1, 2];
const LABELS = [0, 1, 2, 3];

const baseServiceEntryFields = {
  fleet: objectId().required(),
  repairPriorityClass: Joi.number()
    .valid(...REPAIR_PRIORITY_CLASSES)
    .required(),
  odometer: Joi.number().default(0),
  void: Joi.boolean().default(false),
  completionDate: Joi.date().required(),
  startDate: Joi.date().allow(null).optional(),
  vendor: objectId().optional(),
  reference: Joi.string().allow('').optional(),
  labels: Joi.number().valid(...LABELS).optional(),
  documents: Joi.array().items(Joi.string()).optional(),
  comments: Joi.string().allow('').optional(),
};

const getServiceEntrySchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseServiceEntryFields),
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
         body: Joi.object(baseServiceEntryFields),
      };

    case 'getById':
    case 'delete':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
      };

    case 'getByFleetId':
      return {
        params: Joi.object({
          fleetId: objectId().required(),
        }),
      };

    default:
      return {};
  }
};

module.exports = getServiceEntrySchema;
