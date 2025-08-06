const Joi = require('joi');
const objectId = require('../objectId.schema');  // Assuming you have a reusable objectId schema

const baseEquipmentFields = {
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  code: Joi.string().optional().trim(),
  isActive: Joi.boolean().default(false),
};

// Schema for different actions
const getEquipmentSchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseEquipmentFields),
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
         body: Joi.object(baseEquipmentFields),
      };

    case 'delete':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
      };

    case 'getById':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
      };

    default:
      return {};
  }
};

module.exports = getEquipmentSchema;
