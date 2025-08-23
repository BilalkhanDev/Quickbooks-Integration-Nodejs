const Joi = require('joi');
const objectId = require('../objectId.schema');  // Assuming objectId schema is defined elsewhere
const BaseSchema = require('../base.schema');  
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

class ServiceAreaSchema extends BaseSchema {
  constructor() {
    super(baseServiceAreaFields);  
  }


}

module.exports = new ServiceAreaSchema();
