const Joi = require('joi');
const objectId = require('./objectId.schema');  
const BaseSchema = require('./base.schema'); 
const baseVendorFields = {
  name: Joi.string().required(),
  status: Joi.number().valid(0, 1).default(0),  // Status with enum values (0 or 1)
  phone: Joi.number().optional().allow(null),  // Optional phone number
  website: Joi.string().optional().allow(null),  // Optional website
  labels: Joi.array().items(Joi.string()).optional().default([]),  // Labels array
  address: Joi.object({
    name: Joi.string().required(),
    coords: Joi.array().items(Joi.number()).length(2).optional(),  // Coordinates: [lat, long]
    city: Joi.string().optional().allow(null),  // Optional city
    state: Joi.string().optional().allow(null),  // Optional state
  }).optional(),
  contactName: Joi.string().optional().allow(null),  // Optional contact name
  contactPhone: Joi.number().optional().allow(null),  // Optional contact phone
  email: Joi.string().optional().email().allow(null),  
  classification: Joi.array().items(Joi.string().valid('charging', 'fuel', 'service', 'asset')).optional().default([]),
  archived: Joi.boolean().default(false),  
  isActive: Joi.boolean().default(true), 
};

class VendorSchema extends BaseSchema {
  constructor() {
    super(baseVendorFields);  
  }


  bulkDelete() {
    return {
      body: Joi.object({
        vendorIds: Joi.array().items(objectId().required()).required(),  // Array of vendor IDs to delete
      }),
    };
  }
}

module.exports = new VendorSchema();
