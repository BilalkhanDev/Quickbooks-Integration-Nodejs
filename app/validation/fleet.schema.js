const Joi = require('joi');
const objectId = require('./objectId.schema');  
const BaseSchema = require('./base.schema');  // Import the BaseSchema

const baseFleetFields = {
  setiDecall: Joi.string().required(),
  serviceAreas: Joi.array().items(objectId()).required(),
  los: objectId().required(),
  vin: Joi.string().required(),
  capacity: Joi.string().required(),
  driverCarNumber: Joi.string().required(),
  assigned_driver:objectId().optional().allow(null),
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
    'any.invalid': 'Invalid SpaceType format'
  }),
  fundingSources: Joi.array().items(objectId()).optional(),
  equipments: Joi.array().items(objectId()).optional(),
  isActive:Joi.boolean().optional().default(true)
};

class FleetSchema extends BaseSchema {
  constructor() {
    super(baseFleetFields); 
  }

  updateDriver() {
    return {
      params: Joi.object({
        id: objectId().required(),
      }),
      body: Joi.object({
        assigned_driver: objectId().required(), // Ensure assigned_driver is required
      }),
    };
  }
}

module.exports = new FleetSchema();
