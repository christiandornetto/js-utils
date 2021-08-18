import { LoggerConfiguration, LoggingLevelEnum } from './ILogger.js';
import { LoggerBase } from './LoggerBase.js';

/**
 * Modular logger
 */
export class Logger extends LoggerBase {
  #configuration: LoggerConfiguration;

  /**
   * Creates an instance of the modular logger. Use the configuration object to inject the logging interfaces.
   * @param {LoggerConfiguration} configuration
   */
  constructor(configuration = new LoggerConfiguration()) {
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
    this.ShouldLog(level) && this.#configuration.loggers.forEach(l => l.Log(level, `${this.TimeStamp()} [${LoggingLevelEnum[level]}] ${message}`, data));
  }
  /**
   * Logs the stack trace of the current position in the code
   * @param {string} message message to log
   * @param {any} data
   */
  public Trace(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Trace) &&
      this.#configuration.loggers.forEach(l => l.Trace(`${this.TimeStamp()} [${LoggingLevelEnum[LoggingLevelEnum.Trace]}] ${message}`, data));
  }
  /**
   * Logs with a level of Debug
   * @param {string} message message to log
   * @param {any} data
   */
  public LogDebug(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Debug) &&
      this.#configuration.loggers.forEach(l => l.LogDebug(`${this.TimeStamp()} [${LoggingLevelEnum[LoggingLevelEnum.Debug]}] ${message}`, data));
  }
  /**
   * Logs with a level of Information
   * @param {string} message message to log
   */
  public LogInformation(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Information) &&
      this.#configuration.loggers.forEach(l => l.LogInformation(`${this.TimeStamp()} [${LoggingLevelEnum[LoggingLevelEnum.Information]}] ${message}`, data));
  }
  /**
   * Logs with a level of Warning
   * @param {string} message message to log
   * @param {any} data
   */
  public LogWarning(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Warning) &&
      this.#configuration.loggers.forEach(l => l.LogWarning(`${this.TimeStamp()} [${LoggingLevelEnum[LoggingLevelEnum.Warning]}] ${message}`, data));
  }
  /**
   * Logs with a level of Error
   * @param {string} message message to log
   * @param {any} data
   */
  public LogError(message: string, data: any): void {
    this.ShouldLog(LoggingLevelEnum.Error) &&
      this.#configuration.loggers.forEach(l => l.LogError(`${this.TimeStamp()} [${LoggingLevelEnum[LoggingLevelEnum.Error]}] ${message}`, data));
  }

  public Download(): void {
    const content: any[] = [];
    this.#configuration.loggers.forEach(l => {
      content.push('log\n');
      l.Download && content.push(...l.Download(), '\n');
    });

    const file = new Blob(content, { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'logs.log';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
