const Joi = require('joi');
const objectId = require('./objectId.schema');  
const BaseSchema = require('./base.schema');  
const baseServiceTaskFields = {
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
    'string.base': 'Title must be a string',
  }),
  description: Joi.string().optional().allow(''),
  maintanceCategories:{
    categoryCode:objectId().optional().allow(null),
    systemCode:objectId().optional().allow(null),
    assemblyCode:objectId().optional().allow(null),
    reasonToRepair:objectId().optional().allow(null),
  },
  isActive: Joi.boolean().optional().default(true),
};

class ServiceTaskSchema extends BaseSchema {
  constructor() {
    super(baseServiceTaskFields); 
  }
}

module.exports = new ServiceTaskSchema();
