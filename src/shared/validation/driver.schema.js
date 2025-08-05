// src/app/validation/schemas/driver.schema.js
const Joi = require('joi');
const objectId = require('./objectId.schema');

const GENDERS = ['Male', 'Female', 'Other'];

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
  user: objectId().optional(),
  isActive: Joi.boolean().optional()
};

const getDriverSchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseDriverFields),
      };

    case 'update':
      return {
          params: Joi.object({
          id: objectId().required(),
        }),
        body: Joi.object(baseDriverFields).fork(
          Object.keys(baseDriverFields),
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
        params: Joi.object({ fleetId: objectId().required() }),
      };

    default:
      return {};
  }
};

module.exports = getDriverSchema;
