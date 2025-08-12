const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../shared/core/utils/pick');
const ApiError = require('../shared/core/exceptions/ApiError');

// Middleware to validate the request based on schema
const validate = (schema) => {
  if (!schema) {
    throw new Error('Schema is required');
  }

  return (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    // Perform validation using Joi
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    // If validation fails, return an error
    if (error) {
      // Remove duplicate error messages using Set
      const errorMessage = [...new Set(error.details.map((d) => d.message))].join(', ');

      const validationErrorMessage = `(Validation Error): ${errorMessage}`;

      return next(new ApiError(httpStatus.BAD_REQUEST, validationErrorMessage));
    }

    Object.assign(req, value); 
    return next();
  };
};

module.exports = validate;
