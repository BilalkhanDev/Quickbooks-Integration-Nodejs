const Joi = require('joi');
const objectId = require('./objectId.schema');

// Base validation fields for Vendor
const baseVendorFields = {
  name: Joi.string().required(),
  status: Joi.number().valid(0, 1).default(0),
  phone: Joi.number().optional().allow(null),
  website: Joi.string().optional().allow(null),
  labels: Joi.array().items(Joi.string()).optional().default([]),
  address: Joi.object({
    name: Joi.string().required(),
    coords: Joi.array().items(Joi.number()).length(2).optional(),  // Coordinates: [lat, long]
    city: Joi.string().optional().allow(null),
    state: Joi.string().optional().allow(null),
  }).optional(),
  contactName: Joi.string().optional().allow(null),
  contactPhone: Joi.number().optional().allow(null),
  email: Joi.string().optional().email().allow(null),
  classification: Joi.array().items(Joi.string().valid('charging', 'fuel', 'service', 'asset')).optional().default([]),
  archived: Joi.boolean().default(false),
  isActive: Joi.boolean().default(true),
};

// Schema for different actions
const getVendorSchema = (mode = 'create') => {
  switch (mode) {
    case 'create':
      return {
        body: Joi.object(baseVendorFields),
      };

    case 'update':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
        body: Joi.object(baseVendorFields),
      };
    case 'getById':
    case 'delete':
      return {
        params: Joi.object({
          id: objectId().required(),
        }),
      };


    case 'bulkDelete':
      return {
        body: Joi.object({
          vendorIds: Joi.array().items(objectId().required()).required(),
        }),
      };

    default:
      return {};
  }
};

module.exports = getVendorSchema;
