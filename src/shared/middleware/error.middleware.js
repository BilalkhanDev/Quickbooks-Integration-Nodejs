
const { default: HttpStatus } = require('http-status');
const logger = require('../../config/logger.config');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

  if (!err.isOperational) {
    logger.error('❌ Unexpected error: %O', err);
  } else {
    logger.warn('⚠️ Handled error: %s', err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
