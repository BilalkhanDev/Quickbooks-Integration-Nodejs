const Joi = require('joi');
const { FLEET_STATUS } = require('../constants/role');
const {mongoose } = require('mongoose');

// Register Schema
const registerSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username can be up to 30 characters long',
      'string.empty': 'Username is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
    }),

  confirmPassword: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Confirm password must be at least 6 characters long',
      'string.empty': 'Confirm password is required',
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email address',
      'string.empty': 'Email is required',
    }),

})
  .custom((value, helper) => {
    if (value.password !== value.confirmPassword) {
      return helper.message("Passwords don't match");
    }
    return value;
  });

// Login Schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email address',
      'string.empty': 'Email is required',
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.empty': 'Password is required',
    }),


})


// user data
const userSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1',
      'any.required': 'Page is required',
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'any.required': 'Limit is required',
    }),
});
const singleUserSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required',
    }),
});
// fleet Schemas

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
}, "ObjectId validation");

const createFleetSchema = Joi.object({
  plate_number: Joi.string().required().messages({
    'string.empty': 'Plate number is required',
    'any.required': 'Plate number is required'
  }),
  make: Joi.string().required().messages({
    'string.empty': 'Make is required',
    'any.required': 'Make is required'
  }),
  model: Joi.string().required().messages({
    'string.empty': 'Model is required',
    'any.required': 'Model is required'
  }),
  color: Joi.string().required().messages({
    'string.empty': 'Color is required',
    'any.required': 'Color is required'
  }),
  year: Joi.number().required().messages({
    'number.base': 'Year must be a number',
    'any.required': 'Year is required'
  }),
  odometer: Joi.number().required().messages({
    'number.base': 'Odometer must be a number',
    'any.required': 'Odometer is required'
  }),
  assigned_driver: objectId.allow(null, ''),
  status: Joi.number().valid(...Object.values(FLEET_STATUS)).default(FLEET_STATUS.ACTIVE),
  insurance_expiry: Joi.date().allow(null, ''),
  service_due_date: Joi.date().allow(null, ''),
});

const updateFleetSchema = Joi.object({
  plate_number: Joi.string(),
  make: Joi.string(),
  model: Joi.string(),
  color: Joi.string(),
  year: Joi.number(),
  odometer: Joi.number(),
  assigned_driver: objectId.allow(null, ''),
  status: Joi.number().valid(...Object.values(FLEET_STATUS)).default(FLEET_STATUS.ACTIVE),
  insurance_expiry: Joi.date().allow(null, ''),
  service_due_date: Joi.date().allow(null, ''),
});

const fleetIdSchema = Joi.object({
  id: objectId.required().messages({
    'string.base': 'Fleet ID must be a string',
    'any.required': 'Fleet ID is required',
    'any.invalid': 'Invalid Fleet ID format'
  })
});

module.exports = {
  registerSchema,
  loginSchema,
  userSchema,
  singleUserSchema,
  createFleetSchema,
  updateFleetSchema,
  fleetIdSchema,
};
