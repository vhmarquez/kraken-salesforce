import { exec } from 'child_process';
import { promisify } from 'util';
import * as vscode from 'vscode';

const execAsync = promisify(exec);

export class SalesforceCli {
  private outputChannel: vscode.OutputChannel;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('Kraken Salesforce');
    this.outputChannel.show(true);
  }

  async executeCommand(command: string): Promise<{ stdout: string; stderr: string }> {
    try {
      this.outputChannel.appendLine(`\n> Executing: sfdx ${command}`);
      const { stdout, stderr } = await execAsync(`sfdx ${command}`);
      this.outputChannel.appendLine(`Output: ${stdout}`);
      if (stderr) {
        this.outputChannel.appendLine(`Warnings/Errors: ${stderr}`);
      }
      return { stdout: stdout.trim(), stderr: stderr?.trim() || '' };
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      this.outputChannel.appendLine(`Failed: ${errMsg}`);
      throw new Error(`CLI execution failed: ${errMsg}`);
    }
  }

  dispose(): void {
    this.outputChannel.dispose();
  }
}