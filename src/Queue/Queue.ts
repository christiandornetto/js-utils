export class Queue<T = any> extends Array {
  Enqueue(value: T): void {
    this.push(value);
  }

  Dequeue(): T {
    return this.shift();
  }

  Peek(): T {
    return this[0];
  }

  IsEmpty(): boolean {
    return this.length === 0;
  }
}
