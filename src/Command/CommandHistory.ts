import { Stack } from '../DataStructures/Stack.js';
import { HistoryAction, ICommand, ICommandResult } from './ICommand.js';

/**
 * The list of commands executed by the command manager.
 */
export class CommandHistory {
  private undoStack: Stack<ICommand>;
  private redoStack: Stack<ICommand>;

  /**
   * Get all the entries from the undo stack.
   */
  public get UndoEntries(): ICommand[] {
    return this.undoStack.Entries;
  }

  /**
   * Gets all the entries from the redo stack.
   */
  public get RedoEntries(): ICommand[] {
    return this.redoStack.Entries;
  }

  /**
   * Instantiate a new CommandHistory with empty stacks.
   */
  constructor() {
    this.undoStack = new Stack();
    this.redoStack = new Stack();
  }

  /**
   * Add a new entry to the history.
   * @param entry The history entry to be added.
   * @param result The result from the last command execution.
   * @param action The action performed during the execution.
   */
  public Add(entry: ICommand, result: ICommandResult, action: HistoryAction): void {
    if (result.CanUndo) {
      this.undoStack.Push(entry);
    }

    let canRedo = false;
    switch (action) {
      case HistoryAction.Execute:
        this.redoStack.Clear();
        canRedo = !!result.CanRedo;
        break;
      case HistoryAction.Redo:
        canRedo = !!result.CanRedo && !this.redoStack.Peek();
        break;
    }

    if (canRedo) {
      this.PushRedo(entry);
    }
  }

  /**
   * Clear undo and redo stacks.
   */
  public Clear(): void {
    this.undoStack.Clear();
    this.redoStack.Clear();
  }

  /**
   * Returns the most recent command to be undone.
   */
  public PopUndo(): ICommand | undefined {
    const entry = this.undoStack.Pop();
    if (entry) {
      this.PushRedo(entry);
    }

    return entry;
  }

  /**
   * Returns the most recent command to be redone.
   */
  public PopRedo(): ICommand | undefined {
    return this.redoStack.Pop();
  }

  /**
   * Adds to the redo history stack.
   * @param entry The entry to be added.
   */
  private PushRedo(entry: ICommand): void {
    const nextEntry = this.redoStack.Peek();
    if (nextEntry != null || nextEntry !== entry) {
      this.redoStack.Push(entry);
    }
  }
}
