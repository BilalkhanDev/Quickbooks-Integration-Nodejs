const Joi = require('joi');
const objectId = require('./objectId.schema');

const PRIORITY_ENUM = [0, 1, 2, 3, 4];
const LABELS_ENUM = [0, 1, 2, 3];

const baseIssueFields = {
  fleet: objectId().required(),
  service: objectId().required(),
  priority: Joi.number().valid(...PRIORITY_ENUM).default(0),
  reportedDate: Joi.date().required(),
  summary: Joi.string().required(),
  description: Joi.string().optional().allow(''),
  labels: Joi.number().valid(...LABELS_ENUM).optional(),
  primaryMeter: Joi.number().optional(),
  void: Joi.boolean().optional(),
  reportedBy: Joi.string().required(),
  assignedTo: Joi.string().optional().allow(''),
  dueDate: Joi.date().optional(),
  primaryMeterDue: Joi.number().optional(),
  documents: Joi.array().items(Joi.string()).optional(),
};

const getIssueSchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseIssueFields),
      };

    case 'update':
      return {
        params: Joi.object({
          issueId: objectId().required(),
        }),
       body: Joi.object(baseIssueFields),
      };

    case 'getById':
    case 'delete':
      return {
        params: Joi.object({
          issueId: objectId().required(),
        }),
      };

    case 'getByServiceId':
      return {
        params: Joi.object({
          serviceId: objectId().required(),
        }),
      };

    default:
      return {};
  }
};

module.exports = getIssueSchema;
