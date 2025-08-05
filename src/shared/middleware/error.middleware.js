
const { default: HttpStatus } = require('http-status');
const logger = require('../../config/logger.config');

const errorHandler = (err, req, res, next) => {
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode : 500;

  // ✅ Log the error
  // logger.error('Error: %s\nStatus: %d\nStack: %s', err.message, statusCode, err.stack || 'No stack');

  res.status(statusCode).json({
    success: false,
    message: err.message || HttpStatus.INTERNAL_SERVER_ERROR,
    statusCode,
    data: null,
  });
};

module.exports = errorHandler;


