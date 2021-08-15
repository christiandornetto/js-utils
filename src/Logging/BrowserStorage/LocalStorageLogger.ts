import { Queue } from '../../Queue/Queue.js';
import { LoggingLevelEnum } from '../ILogger.js';
import { LoggerBase } from '../LoggerBase.js';
import { LocalStorageLoggerConfiguration } from './LocalStorageLoggerConfiguration.js';

export class LocalStorageLogger extends LoggerBase {
  #configuration: LocalStorageLoggerConfiguration;
  #queue: Queue;

  /**
   *
   * @param {LocalStorageLoggerConfiguration} configuration
   */
  constructor(configuration = new LocalStorageLoggerConfiguration()) {
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
    localStorage.setItem(this.#configuration.name + this.#queue.Length, logData);
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
}
