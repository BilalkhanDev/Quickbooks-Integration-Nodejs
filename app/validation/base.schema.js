const Joi = require('joi');
const objectId = require('./objectId.schema');  

class BaseSchema {
  constructor(fields) {
    this.fields = fields;  
  }
    create() {
        return {
            body: Joi.object(this.fields),
        }
    };

    update() {
        return {
            body: Joi.object(this.fields).min(1),
            params: Joi.object({
                id: objectId().required().messages({
                    'any.required': 'ID is required for update',
                    'string.pattern.base': 'Invalid ID format',
                }),
            }),
        }
    };

    delete() {
        return {
            params: Joi.object({
                id: objectId().required().messages({
                    'any.required': 'ID is required for deletion',
                    'string.pattern.base': 'Invalid ID format',
                }),
            }),
        }
    };

    getById() {
        return {
            params: Joi.object({
                id: objectId().required().messages({
                    'any.required': 'ID is required to get by ID',
                    'string.pattern.base': 'Invalid ID format',
                })
            })
        }
    };

    getAll() {
        return {
            query: Joi.object({
                page: Joi.number().integer().min(1).default(1),
                limit: Joi.number().integer().min(1).max(100).default(10),
                sort: Joi.string(),
                search: Joi.string(),
                isActive: Joi.boolean().optional(),
            }).unknown(false), // Reject any additional query parameters
        }
    };
}

module.exports = BaseSchema;