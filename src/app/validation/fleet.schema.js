const Joi = require('joi');
const objectId = require('./objectId.schema');

const baseFleetFields = {
  setiDecall: Joi.string().required(),
  serviceAreas: Joi.array().items(objectId()).required(),
  los: objectId().required(),
  vin: Joi.string().required(),
  capacity: Joi.string().required(),
  driverCarNumber: Joi.string().required(),
  driverCarModel: Joi.string().required(),
  driverCarYear: Joi.string().required(),
  driverCarColor: Joi.string().required(),
  bodyType: Joi.string().required(),
  type: objectId().required(),
  fuelType: objectId().required(),
  group: objectId().required(),
  realOdometer: Joi.string().required(),
  gasCardNumber: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive').required(),
  limitation: Joi.string().optional(),
  notes: Joi.string().optional(),
  spaceType: objectId().required().messages({
    'string.base': 'Space Type must be a string',
    'any.required': 'SpaceType is required',
    'any.invalid': 'Invalid SpacetYpe format'
  }),
  fundingSources: Joi.array().items(objectId()).optional(),
  equipments: Joi.array().items(objectId()).optional(),
};


// ✅ Schema Generator Function
const getFleetSchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseFleetFields), // ✅ no .fork
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
        body: Joi.object(
          Object.fromEntries(
            Object.entries(baseFleetFields).map(([key, schema]) => [key, schema.optional()])
          )
        ),
      };

    case 'delete':
    case 'getById':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
      };

    default:
      return {};
  }
};


module.exports = getFleetSchema;
