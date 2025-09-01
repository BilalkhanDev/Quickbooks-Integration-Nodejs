const Joi = require('joi');
const objectId = require('./objectId.schema');
const BaseSchema = require('./base.schema');

const baseAuthFields = {
  username: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'Username must be a string',
      'string.max': 'Username cannot exceed 50 characters',
      'any.required': 'Username is required',
    }),

  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      'string.email': 'Email must be a valid email',
      'string.max': 'Email cannot exceed 100 characters',
      'any.required': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .max(255)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password cannot exceed 255 characters',
      'any.required': 'Password is required',
    }),
  timeZone: Joi.string()
    .pattern(/^[A-Za-z]+\/[A-Za-z_]+$/)  // Regex to allow time zones like "Asia/Kolkata", "Europe/London"
    .optional()
    .messages({
      'string.base': 'Time zone must be a string',
      'string.pattern.base': 'Invalid time zone format. Use the format Region/City (e.g., Asia/Kolkata)',
    }),

  role: objectId().required(),
  contactNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .messages({
      'string.base': 'Contact number must be a string',
      'string.pattern.base': 'Invalid contact number format. Use an international format (+1234567890)',
    }),

  address: Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Address name must be a string',
      'any.required': 'Address name is required',
    }),
    coords: Joi.array().items(Joi.number()).default([0, 0]),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
  }).optional().messages({
    'object.base': 'Address must be an object with name, coords, city, and state',
  }),
};

class AuthSchema extends BaseSchema {
  constructor() {
    super(baseAuthFields)
  }
  
  register() {
    return {
      body: Joi.object({
        email: baseAuthFields.email,
        password: baseAuthFields.password,
        timeZone:baseAuthFields.timeZone,
        username:baseAuthFields.username,
        role:baseAuthFields.role

      }),
    }
  }
  login() {
    return {
      body: Joi.object({
        email: baseAuthFields.email,
        password: baseAuthFields.password,

      }),

    }
  }
}

module.exports = new AuthSchema();
