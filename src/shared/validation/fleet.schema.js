const Joi = require('joi');
const { FLEET_STATUS } = require('../constants/role');

const create = Joi.object({
  setiDecall: Joi.string().required(),
  serviceAreas: Joi.array().items(Joi.string()).min(1).required(),
  los: Joi.string().required(),
  spaceType: Joi.string().required(),
  bodyType: Joi.string().valid('Full-Cut', 'Half-Cut').required(),
  capacity: Joi.string().required(),
  equipments: Joi.array().items(Joi.string()).min(1).required(),
  fundingSources: Joi.array().items(Joi.string()).min(1).required(),
  vin: Joi.string().required(),
  gasCardNumber: Joi.string().required(),
  driverCarYear: Joi.string().required(),
  driverCarNumber: Joi.string().required(),
  driverCarColor: Joi.string().required(),
  driverCarModel: Joi.string().required(),
  fuelType: Joi.string().required(),
  realOdometer: Joi.string().required(),
  limitation: Joi.string().optional(),
  notes: Joi.string().optional(),
  assigned_driver: Joi.string().optional(),
  status: Joi.string().valid(...FLEET_STATUS).optional()
});



module.exports = {create};
