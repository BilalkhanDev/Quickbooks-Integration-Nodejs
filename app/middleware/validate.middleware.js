const ApiError = require("../shared/core/exceptions/ApiError");
const pick = require("../shared/core/utils/pick");
const HttpStatus = require('http-status').default;
const validate = (schema) => {
  if (!schema) {
    throw new ApiError('Schema is required');
  }

  return (req, res, next) => {
   
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const errors = [];

    // Iterate over the schema's valid keys and validate
    Object.keys(validSchema).forEach(key => {
      if (validSchema[key]) {
        const { error } = validSchema[key].validate(req[key], { abortEarly: false });
        if (error) {
          errors.push(...error.details);
        } 
      }
    });

    if (errors.length > 0) {
      const errorMessage = [...new Set(errors.map((d) => d.message))].join(', ');
      const validationErrorMessage = `(Validation Error): ${errorMessage}`;
      return next(new ApiError(HttpStatus.BAD_REQUEST, validationErrorMessage));
    }

    return next();
  };
};
module.exports=validate