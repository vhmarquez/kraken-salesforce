import { expect } from 'chai';
import * as sinon from 'sinon';
import * as cp from 'child_process';
import { SalesforceCli } from '../src/utils/salesforceCli';

describe('SalesforceCli', () => {
  let cli: SalesforceCli;
  let execStub: sinon.SinonStub<typeof cp.exec>;

  beforeEach(() => {
    cli = new SalesforceCli();
    execStub = sinon.stub(cp, 'exec').callsFake((command, callback) => {
      callback(null, { stdout: 'sfdx version 7.0.0', stderr: '' });
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should execute CLI command and return output', async () => {
    const result = await cli.executeCommand('--version');
    expect(result.stdout).to.equal('sfdx version 7.0.0');
    expect(result.stderr).to.equal('');
    expect(execStub.calledOnce).to.be.true;
  });

  it('should handle stderr and log it', async () => {
    execStub.callsFake((command, callback) => {
      callback(null, { stdout: '', stderr: 'Warning message' });
    });
    const result = await cli.executeCommand('--help');
    expect(result.stderr).to.equal('Warning message');
  });

  it('should throw and log error on execution failure', async () => {
    execStub.callsFake((command, callback) => {
      callback(new Error('Command failed'), { stdout: '', stderr: '' });
    });
    try {
      await cli.executeCommand('--invalid');
      expect.fail('Expected error');
    } catch (error) {
      expect((error as Error).message).to.include('CLI execution failed');
    }
  });
});