import { ILogger, ILoggerInterfaceConfiguration, LoggingLevelEnum } from '../ILogger.js';
import { LoggerBase } from '../LoggerBase.js';

/**
 * Implementation of the console logger. Set the logging level using the constructor.
 */
export class ConsoleLogger extends LoggerBase implements ILogger {
  #configuration: IConsoleLoggerConfiguration;
  /**
   * Creates a new console logger with the predefined logging level
   * @param {IConsoleLoggerConfiguration} configuration Optional configuration object
   */
  constructor(configuration: IConsoleLoggerConfiguration = {}) {
    super(configuration);
    this.#configuration = configuration;
  }

  /**
   * Logs a message, including a timestamp, to the console
   * @param {number} level value between 0 and 4
   * @param {string} message message to log
   * @param {any} data
   */
  public Log(level: LoggingLevelEnum, message: string, data: any): void {
    if (this.ShouldLog(level) === false) {
      return;
    }

    const logData = [`%c${message}`, this.#GetConsoleOptions(level), data];
    switch (level) {
      case LoggingLevelEnum.Trace:
        console.trace(...logData);
        break;
      case LoggingLevelEnum.Debug:
        console.debug(...logData);
        break;
      case LoggingLevelEnum.Information:
        console.info(...logData);
        break;
      case LoggingLevelEnum.Warning:
        console.warn(...logData);
        break;
      case LoggingLevelEnum.Error:
        console.error(...logData);
        break;
    }
  }
  /**
   * Logs the stack trace of the current position in the code
   * @param {string} message message to log
   * @param {any} data
   */
  public Trace(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Trace) && console.trace(`%c${message}`, this.#GetConsoleOptions(LoggingLevelEnum.Trace), data);
  }
  /**
   * Logs with a level of Debug
   * @param {string} message message to log
   * @param {any} data
   */
  public LogDebug(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Debug) && console.debug(`%c${message}`, this.#GetConsoleOptions(LoggingLevelEnum.Debug), data);
  }
  /**
   * Logs with a level of Information
   * @param {string} message message to log
   * @param {any} data
   */
  public LogInformation(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Information) && console.info(`%c${message}`, this.#GetConsoleOptions(LoggingLevelEnum.Information), data);
  }
  /**
   * Logs with a level of Warning
   * @param {string} message message to log
   * @param {any} data
   */
  public LogWarning(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Warning) && console.warn(`%c${message}`, this.#GetConsoleOptions(LoggingLevelEnum.Warning), data);
  }
  /**
   * Logs with a level of Error
   * @param {string} message message to log
   * @param {any} data
   */
  public LogError(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Error) && console.error(`%c${message}`, this.#GetConsoleOptions(LoggingLevelEnum.Error), data);
  }

  #GetConsoleOptions(level: LoggingLevelEnum) {
    return `color: ${this.#configuration.colors && this.#configuration.colors[level]}`;
  }
}

export interface IConsoleLoggerConfiguration extends ILoggerInterfaceConfiguration {
  colors?: { [level: number]: string };
}
