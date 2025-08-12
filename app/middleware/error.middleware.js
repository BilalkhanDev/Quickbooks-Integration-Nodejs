const { default: HttpStatus } = require('http-status');
const loggerFactory = require('../config/logger.config');
const ApiError = require('../shared/core/exceptions/ApiError');

const errorHandler = (err, req, res, next) => {
  const statusCode = Number.isInteger(err.statusCode) ? err.statusCode :
    Number.isInteger(err.status) ? err.status : 500;

  loggerFactory.logError(req, err, {
    timestamp: new Date().toISOString(),
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query
  });


  let errorMessage;

  if (err instanceof ApiError) {
    errorMessage = typeof err === 'object' ? JSON.stringify(err.statusCode) : err.statusCode;
  } else if (typeof err === 'object' && err.message) {
    errorMessage = JSON.stringify(err.message) || HttpStatus.INTERNAL_SERVER_ERROR;
  } else {
    errorMessage = err.message || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ?
      (statusCode < 500 ? errorMessage : HttpStatus.INTERNAL_SERVER_ERROR) :
      errorMessage,
    statusCode,
    data: null,
    // ...(process.env.NODE_ENV !== 'production' && { 
    //   // stack: err.stack,
    //   timestamp: new Date().toISOString()
    // })
  });
};

module.exports = errorHandler;