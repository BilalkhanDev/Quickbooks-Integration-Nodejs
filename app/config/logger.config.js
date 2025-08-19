// logger.config.js
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }), // Include full stack trace
  winston.format.printf(({ timestamp, level, message, stack }) => {
    // Ensure level is a string and call .toUpperCase() on it
    const levelStr = typeof level === 'string' ? level : 'unknown';
    let logMessage = `${timestamp} [${levelStr.toUpperCase()}]: ${message}`;
    if (stack) {
      logMessage += `\nStack Trace: ${stack}`;
    }
    return logMessage;
  })
);

// Configure winston logger
const logger = winston.createLogger({
  level: 'error',
  format: customFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

module.exports = logger;



// Function to create module-specific daily rotate file transport

const createModuleTransport = (moduleName) => {
  // Sanitize moduleName to avoid invalid characters for file paths
  const sanitizedModuleName = moduleName.replace(/[:*?"<>|]/g, '_');  // Replace invalid characters

  return new DailyRotateFile({
    filename: path.join(logsDir, `${sanitizedModuleName}-%DATE%-error.log`),  // Safe filename
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '7d', // Keep files for 7 days
    level: 'error',
    format: customFormat,
    zippedArchive: true, // Compress old files
    handleExceptions: true,
    handleRejections: true
  });
};

// Function to create a logger for a specific module
const createModuleLogger = (moduleName) => {
  const moduleLogger = winston.createLogger({
    level: 'error',
    format: customFormat,
    transports: [
      createModuleTransport(moduleName),
      // Console transport for development
      new winston.transports.Console({
        level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        )
      })
    ]
  });

  // Make sure 'http' method is defined and works correctly
  moduleLogger.http = (message, meta = {}) => {
    return moduleLogger.info(message, { ...meta, level: 'http' });  // Use info level, with custom 'http' label
  };

  // Add module name to all log entries
  const originalLog = moduleLogger.log;
  moduleLogger.log = function(level, message, meta = {}) {
    return originalLog.call(this, level, message, { ...meta, module: moduleName });
  };

  return moduleLogger;
};

// Main logger factory
class LoggerFactory {
  constructor() {
    this.loggers = new Map();
    this.setupCleanupJob();
  }

  // Get or create a logger for a specific module
  getLogger(moduleName) {
    if (!this.loggers.has(moduleName)) {
      this.loggers.set(moduleName, createModuleLogger(moduleName));
    }
    return this.loggers.get(moduleName);
  }

  // Extract module name from request path
  getModuleFromPath(reqPath) {
    if (!reqPath) return 'general';
    
    const pathParts = reqPath.trim().split('/').filter(part => part);
    
    // Common API patterns
    if (pathParts[0] === 'api' && pathParts[1]) {
      return pathParts[1]; // /api/auth -> auth
    }
    
    return pathParts[0] || 'general'; // fallback
  }

  // Log error with automatic module detection
  logError(req, err, additionalInfo = {}) {
    const moduleName = this.getModuleFromPath(req?.originalUrl || req?.path);
    const logger = this.getLogger(moduleName);
    
    const errorMessage = typeof err.message === 'object' ? JSON.stringify(err.message) : err.message;
    
    const errorInfo = {
      status: err.statusCode || err.status || 500,
      url: req?.originalUrl || req?.url,
      method: req?.method,
      userAgent: req?.get('User-Agent'),
      ip: req?.ip || req?.connection?.remoteAddress,
      ...additionalInfo
    };

    // Pass the message as first parameter and metadata as second
    logger.error(errorMessage, errorInfo);
  }

  // Setup automatic cleanup job for old log files
  setupCleanupJob() {
    // Run cleanup every 24 hours
    setInterval(() => {
      this.cleanupOldLogs();
    }, 24 * 60 * 60 * 1000);

    // Run cleanup on startup
    setTimeout(() => {
      this.cleanupOldLogs();
    }, 5000);
  }

  // Clean up log files older than 7 days
  cleanupOldLogs() {
    try {
      if (!fs.existsSync(logsDir)) return;

      const files = fs.readdirSync(logsDir);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      files.forEach(file => {
        const filePath = path.join(logsDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isFile() && stats.mtime < sevenDaysAgo) {
          fs.unlinkSync(filePath);
          console.log(`Cleaned up old log file: ${file}`);
        }
      });
    } catch (error) {
      console.error('Error during log cleanup:', error);
    }
  }
}

// Create singleton instance
const loggerFactory = new LoggerFactory();

module.exports = loggerFactory;
