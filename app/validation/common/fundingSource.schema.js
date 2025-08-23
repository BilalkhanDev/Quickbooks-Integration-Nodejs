const Joi = require('joi');
const objectId = require('../objectId.schema'); 
const BaseSchema = require('../base.schema');


const addressSchema = Joi.object({
  name: Joi.string().required(),
  coords: Joi.array().items(Joi.number()).length(2).required().messages({
    'array.length': 'Coordinates must contain exactly 2 numbers.',
  }),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zipCode: Joi.string().optional(),
  aptSuiteRoom: Joi.string().optional(),
});

const baseFundingSourceFields = {
  title: Joi.string().required().min(3).messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
  }),
  contactNumber: Joi.string().required().pattern(/^\+?\d{1,3}-?\d{3}-?\d{4,9}$/).messages({
    'string.pattern.base': 'Invalid contact number. It should be 10 to 15 digits long.',
  }),
  phoneNumber: Joi.string().pattern(/^\+?\d{1,3}-?\d{3}-?\d{4,9}$/).optional().messages({
    'string.pattern.base': 'Invalid phone number. It should be 10 to 15 digits long.',
  }),
  email: Joi.string().required().email().messages({
    'string.email': 'Invalid email format. Please enter a valid email address.',
  }),
  timeZone: Joi.string().default('America/New_York'),
  address: addressSchema,
  profileImageURL: Joi.string().optional(),
  isActive: Joi.boolean().optional(),
};

class FundingSourceSchema extends BaseSchema {
  constructor() {
    super(baseFundingSourceFields);  
  }

  bulkDelete() {
    return {
      body: Joi.object({
        vendorIds: Joi.array().items(objectId().required()).required(), 
      }),
    };
  }
}

module.exports = new FundingSourceSchema();
