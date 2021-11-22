export interface ILogger {
  Log(level: LoggingLevelEnum, message: string, data: any): void;
  Trace(message: string, data: any): void;
  LogDebug(message: string, data: any): void;
  LogInformation(message: string, data: any): void;
  LogWarning(message: string, data: any): void;
  LogError(message: string, data: any): void;
  Download?(): any;
}

export interface ILoggerInterfaceConfiguration {
  loggingLevel?: LoggingLevelEnum;
}

export interface ILoggerConfiguration extends ILoggerInterfaceConfiguration {
  loggingLevel: LoggingLevelEnum;
  loggers: ILogger[];
}

export enum LoggingLevelEnum {
  Trace = 0,
  Debug = 1,
  Information = 2,
  Warning = 3,
  Error = 4,
  None = 999,
}
