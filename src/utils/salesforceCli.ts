import { exec } from 'child_process';
import * as vscode from 'vscode';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class SalesforceCli {
  private outputChannel: vscode.OutputChannel;

  constructor(outputChannel: vscode.OutputChannel) {
    this.outputChannel = outputChannel;
  }

  async execute(command: string): Promise<{ stdout: string; stderr: string }> {
    this.outputChannel.appendLine(`Executing Salesforce CLI: sfdx ${command}`);
    try {
      const { stdout, stderr } = await execAsync(`sfdx ${command}`);
      this.outputChannel.appendLine(`CLI Output: ${stdout}`);
      if (stderr) {
        this.outputChannel.appendLine(`CLI Error: ${stderr}`);
      }
      return { stdout, stderr };
    } catch (error) {
      this.outputChannel.appendLine(`CLI Execution Error: ${error}`);
      throw error;
    }
  }
}