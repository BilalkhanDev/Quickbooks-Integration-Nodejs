const schemas = require('../validation/schema');

const reqValidator = (schemaName, source = 'body') => {
  return (req, res, next) => {
    const schema = schemas[schemaName];
    if (!schema) {
      return res.status(400).json({ error: `Schema '${schemaName}' not found` });
    }

    let data;

    switch (source) {
      case 'params':
        if (!req.params || Object.keys(req.params).length === 0) {
          return res.status(400).json({ error: 'Missing URL parameters' });
        }
        data = req.params;
        break;

      case 'query':
        if (!req.query || Object.keys(req.query).length === 0) {
          return res.status(400).json({ error: 'Missing query parameters' });
        }
        data = req.query;
        break;

      case 'body':
      default:
        if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: 'Missing request body' });
        }
        data = req.body; // ✅ Do not inject req.params.id
        break;
    }

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({ error: errorMessages });
    }

    next();
  };
};

module.exports = reqValidator;
