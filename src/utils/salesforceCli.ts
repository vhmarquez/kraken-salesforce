import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as util from 'util';

const exec = util.promisify(cp.exec);

export class SalesforceCli {
  private outputChannel: vscode.OutputChannel;

  constructor(outputChannel: vscode.OutputChannel) {
    this.outputChannel = outputChannel;
  }

  async execute(command: string, cliCommand: string = 'sfdx'): Promise<{ stdout: string; stderr: string }> {
    try {
      const { stdout, stderr } = await exec(`${cliCommand} ${command}`);
      this.outputChannel.appendLine(`CLI command: ${cliCommand} ${command}`);
      this.outputChannel.appendLine(`Stdout: ${stdout}`);
      if (stderr) {
        this.outputChannel.appendLine(`Stderr: ${stderr}`);
      }
      return { stdout, stderr };
    } catch (error: any) {
      this.outputChannel.appendLine(`Error executing ${cliCommand} ${command}: ${error.message}`);
      throw error;
    }
  }
}