const Joi = require('joi');
const objectId = require('./objectId.schema');
const BaseSchema = require('./base.schema');  // Import the BaseSchema

const GENDERS = ['Male', 'Female', 'Other'];  // Allowed genders

// Fields specific to Driver
const baseDriverFields = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  gender: Joi.string().valid(...GENDERS).required(),
  address: Joi.string().required(),
  zipcode: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  license: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  serviceArea: Joi.string().required(),
  garageAddress: Joi.string().required(),
  fleet: objectId().optional(),
  isActive: Joi.boolean().optional(),
};

class DriverSchema extends BaseSchema {
  constructor() {
    super(baseDriverFields);  // Pass the driver-specific fields to the base schema
  }

  getByFleetId() {
    return {
      params: Joi.object({
        fleetId: objectId().required(),
      }),
    };
  }
}

module.exports = new DriverSchema();
