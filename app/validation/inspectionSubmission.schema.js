const Joi = require('joi');
const objectId = require('./objectId.schema');  
const BaseSchema = require('./base.schema');

const ItemValueSchema = Joi.object({
  itemId: Joi.string().required(),
  value: Joi.any().optional(), 
});

const baseInspectionSubmissionFields = {
  inspectionId: objectId().required(),  
  fleet: objectId().required(), 
  inspectedBy: Joi.object({
    userId: Joi.string().required(),  
    name: Joi.string().optional(),  
    email: Joi.string().email().optional(),
  }).required(),
  itemValues: Joi.array().items(ItemValueSchema).required(),  
  status: Joi.string().valid('active', 'inactive').default('active'),
};

class InspectionSubmissionSchema extends BaseSchema {
  constructor() {
    super(baseInspectionSubmissionFields);  
  }

  getByFleetId() {
    return {
      params: Joi.object({
        fleetId: objectId().required(),
      }),
    };
  }
}

module.exports = new InspectionSubmissionSchema();
