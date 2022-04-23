/**
 * Describe a class that can be executed by the Command Manager.
 */
export interface ICommand {
  /**
   * Logic to be executed when the command is run.
   */
  Execute(): ICommandResult;
  /**
   * Logic to be executed when the command is undone.
   */
  Undo(): ICommandResult;
  /**
   * Logic to be executed when the command is redone.
   */
  Redo(): ICommandResult;
}

/**
 * Describes the outcome of the command execution. It specifies whether a command can be undone and/or redone.
 */
export interface ICommandResult {
  Success: boolean;
  CanUndo?: boolean;
  CanRedo?: boolean;
}

/**
 * History action types.
 */
export enum HistoryAction {
  Execute,
  Undo,
  Redo,
}
