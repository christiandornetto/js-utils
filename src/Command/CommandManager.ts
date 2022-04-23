import { CommandHistory } from './CommandHistory.js';
import { HistoryAction, ICommand, ICommandResult } from './ICommand.js';

/**
 * Standard implementation of a command manager.
 */
export class CommandManager {
  private history: CommandHistory;

  /**
   * Creates a new instance of the command manager.
   * @param history Predefined history of commands (from storage for instance).
   */
  constructor(history?: CommandHistory) {
    this.history = history ?? new CommandHistory();
  }

  /**
   * Executes the command.
   * @param command The command to be executed.
   */
  public Execute(command: ICommand): ICommandResult {
    const commandResult = command.Execute();

    if (commandResult.Success && commandResult.CanUndo) {
      this.history.Add(command, commandResult, HistoryAction.Execute);
    }

    return commandResult;
  }

  /**
   * Undoes the most recent command.
   */
  public Undo(): ICommandResult {
    const command = this.history.PopUndo();

    if (command) {
      const commandResult = command.Undo();
      return commandResult;
    }

    return { Success: false };
  }

  /**
   * Redoes the most recent command.
   */
  public Redo(): ICommandResult {
    const command = this.history.PopRedo();

    if (command) {
      const commandResult = command.Redo();
      if (commandResult.Success) {
        this.history.Add(command, commandResult, HistoryAction.Redo);
        return commandResult;
      }
    }

    return { Success: false };
  }
}
