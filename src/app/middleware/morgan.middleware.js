const morgan = require('morgan');
const logger = require('../../config/logger.config');


// Create a stream object for morgan that writes to Winston
const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development'; // only log in dev
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);

module.exports = morganMiddleware;
