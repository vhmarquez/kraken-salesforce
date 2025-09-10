import * as assert from 'assert';
import { SalesforceCli } from '../../utils/salesforceCli';
import * as cp from 'child_process';
import * as util from 'util';

const exec = util.promisify(cp.exec);

// Mock output channel
class MockOutputChannel {
  name = 'mock';
  append(): void {}
  appendLine(): void {}
  clear(): void {}
  show(): void {}
  hide(): void {}
  dispose(): void {}
  replace(): void {}
}

suite('SalesforceCli Test Suite', () => {
  test('execute should run sfdx command', async function () {
    // Check if Salesforce CLI is installed
    let cliAvailable = false;
    try {
      const { stdout } = await exec('sfdx --version');
      if (stdout.includes('sfdx-cli')) {
        cliAvailable = true;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.log('Salesforce CLI not found, skipping test:', errorMessage);
      this.skip();
    }

    if (!cliAvailable) {
      console.log('Salesforce CLI version check failed, skipping test');
      this.skip();
    }

    const mockChannel = new MockOutputChannel();
    const sfCli = new SalesforceCli(mockChannel);
    const { stdout } = await sfCli.execute('version');
    assert.ok(stdout.includes('sfdx-cli'), 'Expected sfdx-cli version in stdout');
  });
});