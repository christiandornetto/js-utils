import { ILoggerInterfaceConfiguration, LoggingLevelEnum } from '../ILogger.js';

export class LocalStorageLoggerConfiguration implements ILocalStorageLoggerConfiguration {
  loggingLevel = LoggingLevelEnum.Error;

  name = 'localstorage-log';
}

export interface ILocalStorageLoggerConfiguration extends ILoggerInterfaceConfiguration {
  name: string;
}
