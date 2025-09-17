import { expect } from 'chai';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { SfdxContext, SfdxProject } from '../src/context/sfdxContext';
import * as memfs from 'memfs';

describe('SfdxContext', () => {
  let context: SfdxContext;
  let workspaceStub: sinon.SinonStub;

  beforeEach(() => {
    context = new SfdxContext();
    // Mock fs with memfs
    sinon.stub(fs, 'existsSync').returns(true);
    sinon.stub(fs, 'readFileSync').returns(
      Buffer.from(JSON.stringify({
        packageDirectories: [{ path: 'force-app', default: true }],
        namespace: 'testNS',
      } as SfdxProject))
    );
    workspaceStub = sinon.stub(vscode.workspace, 'workspaceFolders').value([
      { uri: { fsPath: '/test/workspace' } } as vscode.WorkspaceFolder,
    ]);
    // Install memfs volume for path mocking if needed
    memfs.vol.fromJSON({
      '/test/workspace/sfdx-project.json': JSON.stringify({
        packageDirectories: [{ path: 'force-app', default: true }],
        namespace: 'testNS',
      }),
    }, '/test/workspace');
  });

  afterEach(() => {
    sinon.restore();
    memfs.vol.reset();
  });

  it('should initialize and parse sfdx-project.json', async () => {
    const project = await context.initialize();
    expect(project.namespace).to.equal('testNS');
    expect(project.packageDirectories[0].path).to.equal('force-app');
    expect(project.packageDirectories[0].default).to.be.true;
  });

  it('should throw if no workspace is open', async () => {
    workspaceStub.returns(undefined);
    await expect(context.initialize()).to.be.rejectedWith('No workspace folder is open');
  });

  it('should throw if sfdx-project.json is missing', async () => {
    (fs.existsSync as sinon.SinonStub).returns(false);
    await expect(context.initialize()).to.be.rejectedWith('sfdx-project.json not found');
  });

  it('should throw if project has no package directories', async () => {
    (fs.readFileSync as sinon.SinonStub).returns(
      Buffer.from(JSON.stringify({ packageDirectories: [] } as Partial<SfdxProject>))
    );
    await expect(context.initialize()).to.be.rejectedWith('No package directories found');
  });
});