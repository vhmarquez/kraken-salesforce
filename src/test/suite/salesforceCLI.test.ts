import * as assert from 'assert';
import { SalesforceCli } from '../../utils/salesforceCli';
import * as vscode from 'vscode';

// Mock output channel
class MockOutputChannel implements vscode.OutputChannel {
  name = 'mock';
  append(value: string): void {}
  appendLine(value: string): void {}
  clear(): void {}
  show(): void {}
  hide(): void {}
  dispose(): void {}
}

suite('SalesforceCli Test Suite', () => {
  test('execute should run sfdx command', async () => {
    const mockChannel = new MockOutputChannel();
    const sfCli = new SalesforceCli(mockChannel);
    const { stdout } = await sfCli.execute('version');
    assert.ok(stdout.includes('sfdx-cli'), 'Expected sfdx-cli version in stdout');
  });
});