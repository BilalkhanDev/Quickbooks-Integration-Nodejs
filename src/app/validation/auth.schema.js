const Joi = require('joi');
const { USER_ROLES } = require('../shared/constants/role');

// 🧱 Base fields
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

  role: Joi.number()
    .valid(...Object.values(USER_ROLES))
    .optional()
    .messages({
      'number.base': 'Role must be a number',
      'any.only': 'Invalid role selected',
    }),
};

// 🎯 getAuthSchema function
const getAuthSchema = (mode = 'register') => {
  switch (mode) {
    case 'register':
      return {
        body: Joi.object(baseAuthFields),
      };

    case 'login':
      return {
        body: Joi.object({
          email: baseAuthFields.email,
          password: baseAuthFields.password,
        }),
      };

    default:
      return {};
  }
};

module.exports = getAuthSchema;
