const Joi = require('joi');
const objectId = require('../objectId.schema');  // Assuming objectId schema is defined elsewhere
const BaseSchema = require('../base.schema');  

const baseLOSFields = {
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

class LOSSchema extends BaseSchema {
  constructor() {
    super(baseLOSFields);  // Pass fields to the BaseSchema
  }
  getById() {
    return {
      params: Joi.object({
        id: objectId().required(),
      }),
    };
  }
}

module.exports = new LOSSchema();
