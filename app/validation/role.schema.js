const Joi = require('joi');
const objectId = require('./objectId.schema'); 
const BaseSchema = require('./base.schema');
const { ROLES_TYPES } = require('../shared/constants/role');

const roleFields = {
  name: Joi.string()
    .trim()
    .lowercase()
    .max(100)
    .required()
    .messages({
      'string.base': 'Role name must be a string',
      'string.max': 'Role name cannot exceed 100 characters',
      'any.required': 'Role name is required',
    }),

  type: Joi.string()
    .valid(...Object.values(ROLES_TYPES)) 
    .required()
    .messages({
      'string.base': 'Role type must be a string',
      'any.required': 'Role type is required',
      'any.only': `Role type must be one of ${Object.values(ROLES_TYPES).join(', ')}`,
    }),

  description: Joi.string()
    .max(255)
    .required()
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot exceed 255 characters',
      'any.required': 'Description is required',
    }),

  permissions: Joi.array()
    .items(Joi.string())
    .min(1)
    .required()
    .messages({
      'array.base': 'Permissions must be an array of strings',
      'array.min': 'At least one permission must be provided',
      'any.required': 'Permissions are required',
    }),

  isActive: Joi.boolean().default(true)
    .messages({
      'boolean.base': 'isActive must be a boolean value',
    }),
};

class RoleSchema extends BaseSchema {
  constructor() {
    super(roleFields); 
  }
}

module.exports = new RoleSchema();
