const morgan = require('morgan');
const logger = require('../config/logger.config').getLogger('general'); 

const stream = {
  write: (message) => {
    logger?.http(message.trim()); 
  },
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream }
);

module.exports = morganMiddleware;
