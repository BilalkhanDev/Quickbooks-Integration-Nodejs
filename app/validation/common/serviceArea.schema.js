const Joi = require('joi');
const objectId = require('../objectId.schema'); // Assuming you have an objectId schema for validating ObjectId

const baseServiceAreaFields = {
  title: Joi.string().required().min(3).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
  }),
  description: Joi.string().required().min(10).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters long',
  }),
  zipCodes: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'ZipCodes must be an array of strings',
  }),
  isActive: Joi.boolean().optional(),
};

const getServiceAreaValidation = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseServiceAreaFields),
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
        body: Joi.object(baseServiceAreaFields),
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

module.exports = getServiceAreaValidation;
