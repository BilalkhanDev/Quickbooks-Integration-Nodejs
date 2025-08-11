const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Custom format for logging (without stack trace)
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: false }),
  winston.format.printf(({ timestamp, level, message, module, status, url, method }) => {
    let logMessage = `${timestamp} [${module || 'GENERAL'}] ${level.toUpperCase()}:`;
    
    if (method && url) {
      logMessage += ` ${method} ${url}`;
    }
    
    if (status) {
      logMessage += ` [${status}]`;
    }
    
    logMessage += ` ${message}`;
    
    return logMessage;
  })
);

// Function to create module-specific daily rotate file transport
const createModuleTransport = (moduleName) => {
  return new DailyRotateFile({
    filename: path.join(logsDir, `${moduleName}-%DATE%-error.log`),
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