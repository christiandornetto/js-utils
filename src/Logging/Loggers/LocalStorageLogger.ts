import { Queue } from '../../DataStructures/Queue.js';
import { ILoggerInterfaceConfiguration, LoggingLevelEnum } from '../ILogger.js';
import { LoggerBase } from '../LoggerBase.js';

export class LocalStorageLogger extends LoggerBase {
  #configuration: ILocalStorageLoggerConfiguration;
  #queue: Queue;

  /**
   *
   * @param {ILocalStorageLoggerConfiguration} configuration
   */
  constructor(configuration: ILocalStorageLoggerConfiguration = { name: 'localstorage-log' }) {
    super(configuration);
    this.#configuration = configuration;
    this.#queue = new Queue();
    Object.keys(localStorage)
      .filter(k => k.startsWith(configuration.name))
      .forEach(k => this.#queue.Enqueue(localStorage.getItem(k)));
  }
  public Log(level: LoggingLevelEnum, message: string, data: any): void {
    if (this.ShouldLog(level) === false) {
      return;
    }
    const logData = JSON.stringify({ message, data });
    this.#queue.Enqueue(logData);
    localStorage.setItem(`${this.#configuration.name}_${this.#queue.Length}`, logData);
  }
  public Trace(message: string, data: any): void {
    throw new Error('Method not implemented.');
  }
  public LogDebug(message: string, data: any): void {
    throw new Error('Method not implemented.');
  }
  public LogInformation(message: string, data: any): void {
    throw new Error('Method not implemented.');
  }
  public LogWarning(message: string, data: any): void {
    throw new Error('Method not implemented.');
  }
  public LogError(message: string, data: any): void {
    throw new Error('Method not implemented.');
  }

  public Download(): any {
    // const a = document.createElement('a');
    return this.#queue.sort().values();
    // a.href = URL.createObjectURL(file);
    // a.download = this.#configuration.name + '.log';
    // a.click();
    // URL.revokeObjectURL(a.href);
  }
}

export interface ILocalStorageLoggerConfiguration extends ILoggerInterfaceConfiguration {
  name: string;
}
