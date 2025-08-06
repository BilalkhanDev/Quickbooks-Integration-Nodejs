const Joi = require('joi');
const objectId = require('../objectId.schema'); 

const baseLOSTitleFields = {
  title: Joi.string().required().min(3).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
  }),
  description: Joi.string().required().min(10).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters long',
  }),
  profileImageURL: Joi.string().uri().optional().messages({
    'string.uri': 'Profile Image URL must be a valid URL',
  }),
  isActive: Joi.boolean().optional(),
};

const getLOSValidationSchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseLOSTitleFields),
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
        body: Joi.object(baseLOSTitleFields),
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

module.exports = getLOSValidationSchema;
