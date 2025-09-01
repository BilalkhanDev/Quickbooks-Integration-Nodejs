// /schemas/auth.schema.js
const Joi = require('joi');
const objectId = require('./objectId.schema');
const BaseSchema = require('./base.schema');

const baseAuthFields = {
  username: Joi.string().max(50).required().messages({
    'string.base': 'Username must be a string',
    'string.max': 'Username cannot exceed 50 characters',
    'any.required': 'Username is required',
  }),

  email: Joi.string().email().max(100).required().messages({
    'string.email': 'Email must be a valid email',
    'string.max': 'Email cannot exceed 100 characters',
    'any.required': 'Email is required',
  }),

  password: Joi.string().min(6).max(255).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password cannot exceed 255 characters',
    'any.required': 'Password is required',
  }),

  profileImageURL: Joi.string().uri().optional().allow('', null),

  timeZone: Joi.string()
    .pattern(/^[A-Za-z]+\/[A-Za-z_]+$/)
    .optional()
    .messages({
      'string.base': 'Time zone must be a string',
      'string.pattern.base': 'Invalid time zone format. Use Region/City (e.g., America/New_York)',
    }),

  role: objectId().required(),

  contactNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .optional()
    .messages({
      'string.base': 'Contact number must be a string',
      'string.pattern.base': 'Invalid contact number format. Use international format (+1234567890)',
    }),
};

class AuthSchema extends BaseSchema {
  constructor() {
    super(baseAuthFields);
  }

  register() {
    return {
      body: Joi.object({
        email: baseAuthFields.email,
        password: baseAuthFields.password,
        timeZone: baseAuthFields.timeZone,
        username: baseAuthFields.username,
        role: baseAuthFields.role,
        profileImageURL: baseAuthFields.profileImageURL,
        contactNumber: baseAuthFields.contactNumber,
      }),
    };
  }

  login() {
    return {
      body: Joi.object({
        email: baseAuthFields.email,
        password: baseAuthFields.password,
      }),
    };
  }

  update() {
    return {
      params: Joi.object({
        id: objectId().required().messages({
          'any.required': 'ID is required for update',
          'string.pattern.base': 'Invalid ID format',
        }),
      }),
      body: Joi.object({
        email: baseAuthFields.email,            // still required
        username: baseAuthFields.username,      // still required
        role: baseAuthFields.role,              // still required
        timeZone: baseAuthFields.timeZone,
        profileImageURL: baseAuthFields.profileImageURL,
        contactNumber: baseAuthFields.contactNumber,
        password: Joi.string().min(6).max(255).optional(),
      }),
    };
  }
}

module.exports = new AuthSchema();
