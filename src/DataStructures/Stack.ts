export class Stack<T = any> {
  private data: T[];

  public get Entries(): T[] {
    return this.data;
  }

  constructor(private capacity: number = Infinity) {
    this.data = [];
  }

  public Push(item: T): void {
    if (this.Size() === this.capacity) {
      throw Error('Stack has reached max capacity');
    }

    this.data.push(item);
  }

  public Pop(): T | undefined {
    return this.data.pop();
  }

  public Peek(): T | undefined {
    return this.data[this.Size() - 1];
  }

  public Size(): number {
    return this.data.length;
  }

  public Clear(): void {
    this.data.length = 0;
  }
}
