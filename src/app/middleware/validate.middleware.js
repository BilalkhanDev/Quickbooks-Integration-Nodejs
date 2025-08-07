// src/shared/middleware/validate.middleware.js
const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../shared/core/utils/pick');
const ApiError = require('../shared/core/exceptions/ApiError');

const validate = (schemaFn, mode = 'create') => {
  if (typeof schemaFn !== 'function') {
    throw new Error('Expected schemaFn to be a function');
  }

  const schema = schemaFn(mode);
  

  return (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details.map((d) => d.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value); // attach validated values to req
    return next();
  };
};

module.exports = validate;
