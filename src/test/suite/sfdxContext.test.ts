import * as assert from 'assert';
import { SfdxContext } from '../../utils/sfdxContext';
import { Volume, createFsFromVolume } from 'memfs';
import * as path from 'path';

suite('SfdxContext Test Suite', () => {
  test('getProjectJson should parse sfdx-project.json', () => {
    const vol = new Volume();
    const mockFs = createFsFromVolume(vol);
    const mockPath = '/mock-project';
    mockFs.mkdirSync(mockPath, { recursive: true });
    mockFs.writeFileSync(
      path.join(mockPath, 'sfdx-project.json'),
      JSON.stringify({ packageDirectories: [{ path: 'force-app' }] })
    );

    const context = new SfdxContext(mockPath, mockFs);
    const json = context.getProjectJson();
    assert.deepStrictEqual(json?.packageDirectories, [{ path: 'force-app' }]);
  });
});