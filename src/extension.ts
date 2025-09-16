import * as vscode from 'vscode';
import { SalesforceCli } from './utils/salesforceCli';
import { SfdxContext } from './context/sfdxContext';

export function activate(context: vscode.ExtensionContext) {
  console.log('Kraken Salesforce extension is now active!');

  const cli = new SalesforceCli();
  const sfdxContext = new SfdxContext();

  let disposable = vscode.commands.registerCommand('vhmarquez-kraken-salesforce.helloWorld', async () => {
    try {
      const project = await sfdxContext.initialize();
      const result = await cli.executeCommand('--version');
      vscode.window.showInformationMessage(
        `Kraken Salesforce: CLI Version - ${result.stdout}, Project Namespace - ${project.namespace || 'None'}`
      );
    } catch (error) {
      vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
  });

  context.subscriptions.push(disposable, cli);
}

export function deactivate() {}