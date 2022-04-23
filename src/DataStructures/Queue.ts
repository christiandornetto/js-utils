export class Queue<T = any> extends Array<T> {
  public get Length(): number {
    return this.length;
  }

  public Enqueue(value: T): void {
    this.push(value);
  }

  public Dequeue(): T | undefined {
    return this.shift();
  }

  public Peek(): T {
    return this[0];
  }

  public IsEmpty(): boolean {
    return this.length === 0;
  }
}
