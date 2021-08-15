export interface ILogger {
  get LoggingLevel(): LoggingLevelEnum;
  Log(level: LoggingLevelEnum, message: string, data: any): void;
  Trace(message: string, data: any): void;
  LogDebug(message: string, data: any): void;
  LogInformation(message: string, data: any): void;
  LogWarning(message: string, data: any): void;
  LogError(message: string, data: any): void;
}

export interface ILoggerInterfaceConfiguration {
  loggingLevel?: LoggingLevelEnum;
}

export class LoggerConfiguration implements ILoggerInterfaceConfiguration {
  loggingLevel = LoggingLevelEnum.None;
  loggers: ILogger[] = [];
}

export const LoggingLevel = {
  Trace: 0,
  Debug: 1,
  Information: 2,
  Warning: 3,
  Error: 4,
  None: 999,
};

export enum LoggingLevelEnum {
  Trace = 0,
  Debug = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
  None = 999,
}
