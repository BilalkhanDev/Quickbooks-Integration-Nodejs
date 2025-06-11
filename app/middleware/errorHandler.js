// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Optional: Log error to DB or external service
  console.error(`[Error] ${req.method} ${req.originalUrl} - ${status}: ${message}`);

  res.status(status).json({
    success: false,
    message,
  });
};
