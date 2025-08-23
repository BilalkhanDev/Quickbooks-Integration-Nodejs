const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../shared/core/utils/pick');
const ApiError = require('../shared/core/exceptions/ApiError');

const validate = (schema) => {
  if (!schema) {
    throw new Error('Schema is required');
  }

  return (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);

    const errors = [];

    Object.keys(validSchema).forEach(key => {
      if (validSchema[key]) {
        const { error } = validSchema[key].validate(req[key] || {});
        if (error) {
          errors.push(...error.details);
        }
      }
    });

    if (errors.length > 0) {
      const errorMessage = [...new Set(errors.map((d) => d.message))].join(', ');
      const validationErrorMessage = `(Validation Error): ${errorMessage}`;
      
      return next(new ApiError(httpStatus.BAD_REQUEST, validationErrorMessage));
    }

    return next();
  };
};

module.exports = validate;