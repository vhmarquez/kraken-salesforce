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
    let cliCommand = 'sfdx';
    try {
      const { stdout } = await exec('sfdx --version');
      if (stdout.includes('sfdx-cli') || stdout.includes('@salesforce/cli')) {
        cliAvailable = true;
      }
    } catch (err: unknown) {
      // Try 'sf' command for newer CLI versions
      try {
        const { stdout } = await exec('sf --version');
        if (stdout.includes('@salesforce/cli')) {
          cliAvailable = true;
          cliCommand = 'sf';
        }
      } catch (sfErr: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.log('Salesforce CLI not found, skipping test:', errorMessage);
        this.skip();
      }
    }

    if (!cliAvailable) {
      console.log('Salesforce CLI version check failed, skipping test');
      this.skip();
    }

    const mockChannel = new MockOutputChannel();
    const sfCli = new SalesforceCli(mockChannel);
    const { stdout } = await sfCli.execute('version', cliCommand);
    assert.ok(stdout.includes('@salesforce/cli') || stdout.includes('sfdx-cli'), 'Expected Salesforce CLI version in stdout');
  });
});