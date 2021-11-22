import { ILoggerInterfaceConfiguration, LoggingLevelEnum } from './ILogger.js';

export abstract class LoggerBase {
  #loggingLevel: LoggingLevelEnum;

  constructor(configuration: ILoggerInterfaceConfiguration = {}) {
    this.#loggingLevel = configuration.loggingLevel ?? LoggingLevelEnum.Warning;
  }
  public abstract Log(level: LoggingLevelEnum, message: string, data: any): void;

  protected ShouldLog(level: LoggingLevelEnum): boolean {
    return this.#loggingLevel <= level;
  }

  protected TimeStamp(): string {
    return new Date().toLocaleString();
  }
}
