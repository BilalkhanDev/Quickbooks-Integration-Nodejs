const Joi = require('joi');
const BaseSchema = require('../base.schema');


// Base Equipment Fields
const baseEquipmentFields = {
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  code: Joi.string().optional().trim(),
  isActive: Joi.boolean().default(false),
};

class EquipmentSchema extends BaseSchema {
  constructor() {
    super(baseEquipmentFields);  
  }

}

module.exports = new EquipmentSchema();
