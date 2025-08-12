
const path = require("path");
const { ActivityLogs } = require("../models/shared/activityLogs.model");

const activityLogger = async (req, res, next) => {
  const start = Date.now();

  const skipPaths = ["/favicon.ico", "/robots.txt"];
  const ext = path.extname(req.originalUrl);
  const skipExts = [".css", ".js", ".png", ".jpg", ".jpeg", ".svg", ".ico"];

  if (skipPaths.includes(req.originalUrl) || skipExts.includes(ext)) {
    return next();
  }

  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (res.statusCode >= 400) {
      if (body?.message) {
        res.locals.errorMessage = body.message;
      } else if (body?.error) {
        if (Array.isArray(body.error)) {
          res.locals.errorMessage = body.error.join("; ") + " (validation)";
        } else {
          res.locals.errorMessage = String(body.error);
        }
      } else if (body?.details) {
        if (Array.isArray(body.details)) {
          res.locals.errorMessage = body.details.join("; ");
        } else {
          res.locals.errorMessage = String(body.details);
        }
      }
    }
    return originalJson(body);
  };

  res.on("finish", async () => {
    try {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      const isError = statusCode >= 400;
      const message = `${req.method} ${req.originalUrl} ${statusCode} (${duration}ms)`;
      const errorMessage = isError ? res.locals.errorMessage || res.statusMessage || "Unknown error" : null;
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.socket?.remoteAddress ||
        "Unknown";

      const logEntry = new ActivityLogs({
        message,
        isError,
        errorMessage,
        statusCode,
        ipAddress: ip,

      });

      await logEntry.save();
    } catch (err) {
      console.error("❌ Failed to save activity log:", err);
    }
  });

  next();
};

module.exports = activityLogger;
