const Joi = require('joi');
const objectId = require('../objectId.schema'); 
const baseSpaceTypeFields = {
  title: Joi.string().required().min(3).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
  }),
  los: objectId().required().messages({
    'string.pattern.base': 'LOS must be a valid ObjectId',
  }),
  description: Joi.string().required().min(10).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters long',
  }),
  loadTime: Joi.string().required().messages({
    'string.empty': 'Load time is required',
  }),
  unloadTime: Joi.string().required().messages({
    'string.empty': 'Unload time is required',
  }),
  isActive: Joi.boolean().optional(),
};

const getSpaceTypeValidation= (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseSpaceTypeFields),
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
        body: Joi.object(baseSpaceTypeFields),
      };

    case 'getById':
    case 'delete':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
      };

    default:
      return {};
  }
};

module.exports = getSpaceTypeValidation;
