const Joi = require('joi');
const objectId = require('./objectId.schema');  // Assuming objectId schema is defined in a separate file

const ItemValueSchema = Joi.object({
  itemId: Joi.string().required(),
  value: Joi.any().optional()
});

const baseInspectionSubmissionFields = {
  inspectionId: objectId().required(),
  fleet: objectId().required(),
  inspectedBy: Joi.object({
    userId: Joi.string().required(),
    name: Joi.string().optional(),
    email: Joi.string().email().optional()
  }).required(),
  itemValues: Joi.array().items(ItemValueSchema).required(),
  status: Joi.string().valid('active', 'inactive').default('active')
};

const getInspectionSubmissionSchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseInspectionSubmissionFields),
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
        body: Joi.object(baseInspectionSubmissionFields).fork(
          Object.keys(baseInspectionSubmissionFields),
          (field) => field.optional()
        ),
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

module.exports = getInspectionSubmissionSchema;
