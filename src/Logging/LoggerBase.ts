import { ILogger, ILoggerInterfaceConfiguration, LoggingLevelEnum } from './ILogger.js';

export abstract class LoggerBase implements ILogger {
  #loggingLevel: LoggingLevelEnum;
  public get LoggingLevel(): LoggingLevelEnum {
    return this.#loggingLevel;
  }

  constructor(configuration: ILoggerInterfaceConfiguration = {}) {
    this.#loggingLevel = configuration.loggingLevel ?? LoggingLevelEnum.Warning;
  }
  public abstract Log(level: LoggingLevelEnum, message: string, data: any): void;
  public abstract Trace(message: string, data: any): void;
  public abstract LogDebug(message: string, data: any): void;
  public abstract LogInformation(message: string, data: any): void;
  public abstract LogWarning(message: string, data: any): void;
  public abstract LogError(message: string, data: any): void;

  protected ShouldLog(level: LoggingLevelEnum): boolean {
    return this.LoggingLevel <= level;
  }

  protected TimeStamp(): string {
    return new Date().toLocaleString();
  }
}
