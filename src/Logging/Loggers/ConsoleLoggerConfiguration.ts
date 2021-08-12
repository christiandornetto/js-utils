import { ILoggerInterfaceConfiguration, LoggingLevelEnum } from '../ILogger.js';

export class ConsoleLoggerConfiguration implements IConsoleLoggerConfiguration {
  loggingLevel = LoggingLevelEnum.None;
  colors: { [level: number]: string } = {};
}

export interface IConsoleLoggerConfiguration extends ILoggerInterfaceConfiguration {
  colors?: { [level: number]: string };
}
