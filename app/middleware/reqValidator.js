const schemas = require('../validation/schema'); // Ensure this is correctly imported

const reqValidator = (schemaName, source = 'body') => {

  return (req, res, next) => {
    console.log(`Validating schema: ${schemaName}, source: ${source}`);
    if (!req) {
      return res.status(400).json({ error: 'Request object is undefined' });
    }
    const schema = schemas[schemaName];

    // If schema is not found, return an error
    if (!schema) {
      return res.status(400).json({ error: `Schema ${schemaName} not found` });
    }

    // Validate based on the source
    let data;
    switch (source) {
      case 'query':
        data = req.query;
        break;
      case 'params':
        data = req.params;
        break;
      case 'body':
      default:
        data = req.body;
        break;
    }

    const { error } = schema.validate(data, { abortEarly: false }); // Abort early set to false for full error details

    // If there are validation errors, send a response
    if (error) {
      const errorMessages = error.details.map(err => err.message);
      console.log("Validation Errors:", errorMessages);
      return res.status(400).json({ error: errorMessages });
    }

    next(); // If validation passes, proceed to the next middleware
  };
};


module.exports = reqValidator;