import * as assert from 'assert';
import { SfdxContext } from '../../utils/sfdxContext';
import { Volume, createFsFromVolume } from 'memfs';
import * as path from 'path';
import * as fs from 'fs';

suite('SfdxContext Test Suite', () => {
  test('getProjectJson should parse sfdx-project.json', () => {
    const vol = new Volume();
    const mockFs = createFsFromVolume(vol) as typeof fs;
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