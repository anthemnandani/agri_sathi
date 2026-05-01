/**
 * Logging levels
 */
export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Logger interface
 */
export interface ILogger {
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: any): void;
}

/**
 * Console logger implementation
 */
export class ConsoleLogger implements ILogger {
  private context: string;
  private minLevel: LogLevel;

  constructor(context: string = 'App', minLevel: LogLevel = LogLevel.DEBUG) {
    this.context = context;
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}] [${this.context}]`;
    
    if (data) {
      return `${prefix} ${message} ${JSON.stringify(data, null, 2)}`;
    }
    return `${prefix} ${message}`;
  }

  debug(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage(LogLevel.DEBUG, message, data));
    }
  }

  info(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage(LogLevel.INFO, message, data));
    }
  }

  warn(message: string, data?: any): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message, data));
    }
  }

  error(message: string, error?: any): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message, error));
    }
  }
}

/**
 * Global logger instance
 */
let globalLogger: ILogger = new ConsoleLogger('App', LogLevel.INFO);

/**
 * Set global logger
 */
export function setLogger(logger: ILogger): void {
  globalLogger = logger;
}

/**
 * Get global logger
 */
export function getLogger(context?: string): ILogger {
  if (context) {
    return new ConsoleLogger(context, LogLevel.INFO);
  }
  return globalLogger;
}

/**
 * Create a scoped logger
 */
export function createLogger(context: string, minLevel?: LogLevel): ILogger {
  return new ConsoleLogger(context, minLevel || LogLevel.INFO);
}

/**
 * Middleware to log requests
 */
export function logRequest(method: string, path: string, timestamp: string): void {
  globalLogger.info(`Incoming ${method} request`, { path, timestamp });
}

/**
 * Middleware to log responses
 */
export function logResponse(
  method: string,
  path: string,
  statusCode: number,
  duration: number
): void {
  globalLogger.info(`Outgoing ${method} response`, {
    path,
    statusCode,
    duration: `${duration}ms`,
  });
}

/**
 * Log database operation
 */
export function logDatabaseOperation(
  operation: string,
  table: string,
  duration: number,
  success: boolean
): void {
  const level = success ? LogLevel.DEBUG : LogLevel.WARN;
  globalLogger.info(`Database ${operation} on ${table}`, {
    duration: `${duration}ms`,
    success,
  });
}

/**
 * Log error with context
 */
export function logErrorWithContext(
  message: string,
  error: any,
  context?: Record<string, any>
): void {
  globalLogger.error(message, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...context,
  });
}

/**
 * Log performance metrics
 */
export function logPerformance(label: string, duration: number): void {
  globalLogger.debug(`Performance: ${label}`, { duration: `${duration}ms` });
}

/**
 * Performance marker
 */
export class PerformanceMarker {
  private startTime: number;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.startTime = performance.now();
  }

  end(): void {
    const duration = performance.now() - this.startTime;
    logPerformance(this.label, Math.round(duration));
  }
}

/**
 * Create performance marker
 */
export function mark(label: string): PerformanceMarker {
  return new PerformanceMarker(label);
}
