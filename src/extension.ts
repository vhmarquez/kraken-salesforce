import * as vscode from 'vscode';
import { SalesforceCli } from './utils/salesforceCli';
import { SfdxContext } from './utils/sfdxContext';

export function activate(context: vscode.ExtensionContext) {
  const outputChannel = vscode.window.createOutputChannel('Salesforce Grok Accelerator');
  outputChannel.appendLine('Extension activated.');

  // Initialize Salesforce CLI
  const sfCli = new SalesforceCli(outputChannel);
  // Example usage: log CLI version
  sfCli.execute('version').then(({ stdout }) => {
    outputChannel.appendLine(`Salesforce CLI Version: ${stdout}`);
  }).catch(err => {
    outputChannel.appendLine(`Error fetching CLI version: ${err}`);
  });

  // Initialize SFDX context
  const workspaceFolder = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
  if (workspaceFolder) {
    const contextParser = new SfdxContext(workspaceFolder);
    const projectJson = contextParser.getProjectJson();
    outputChannel.appendLine(`SFDX Project: ${JSON.stringify(projectJson)}`);
  }

  let disposable = vscode.commands.registerCommand('salesforceGrok.helloWorld', () => {
    outputChannel.appendLine('Hello World command executed.');
    vscode.window.showInformationMessage('Hello World from Salesforce Grok Accelerator!');
  });

  context.subscriptions.push(disposable, outputChannel);
}

export function deactivate() {}