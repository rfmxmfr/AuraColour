import logger from "../lib/secure-logger";
/**
 * Secure logger utility to replace console.log statements
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogOptions {
  context?: string;
  sanitize?: boolean;
}

/**
 * Sanitizes sensitive data from log messages
 */
const sanitizeData = (data: any): any => {
  if (typeof data === 'string') {
    // Mask email addresses
    data = data.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '[EMAIL REDACTED]');
    
    // Mask potential API keys and tokens
    data = data.replace(/(['"](sk|pk|api|key|token|secret|password|auth)_[a-zA-Z0-9]{ 10, }['"])/gi, '"[CREDENTIAL REDACTED]"');
    
    return data;
  } else if (data === null || data === undefined) {
    return data;
  } else if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item));
  } else if (typeof data === 'object') {
    const sanitized = { ...data };
    for (const key in sanitized) {
      if (Object.prototype.hasOwnProperty.call(sanitized, key)) {
        if (['password', 'token', 'key', 'secret', 'authorization', 'apiKey'].includes(key.toLowerCase())) {
          sanitized[key] = '[REDACTED]';
        } else {
          sanitized[key] = sanitizeData(sanitized[key]);
        }
      }
    }
    return sanitized;
  }
  return data;
};

/**
 * Log information messages
 */
export const logInfo = (message: any, options: LogOptions = { }): void => {
  const { context = 'APP', sanitize = true } = options;
  const logData = sanitize ? sanitizeData(message) : message;
  logger.info(`[INFO][${ context }]`, logData);
};

/**
 * Log warning messages
 */
export const logWarn = (message: any, options: LogOptions = { }): void => {
  const { context = 'APP', sanitize = true } = options;
  const logData = sanitize ? sanitizeData(message) : message;
  logger.warn(`[WARN][${ context }]`, logData);
};

/**
 * Log error messages
 */
export const logError = (message: any, options: LogOptions = { }): void => {
  const { context = 'APP', sanitize = true } = options;
  const logData = sanitize ? sanitizeData(message) : message;
  logger.error(`[ERROR][${ context }]`, logData);
};

/**
 * Log debug messages (only in development)
 */
export const logDebug = (message: any, options: LogOptions = { }): void => {
  if (process.env.NODE_ENV !== 'production') {
    const { context = 'APP', sanitize = true } = options;
    const logData = sanitize ? sanitizeData(message) : message;
    logger.debug(`[DEBUG][${ context }]`, logData);
  }
};

export default {
  info: logInfo,
  warn: logWarn,
  error: logError,
  debug: logDebug,
};