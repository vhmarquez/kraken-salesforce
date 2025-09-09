import * as assert from 'assert';
import { SfdxContext } from '../../utils/sfdxContext';
import { Volume, createFsFromVolume } from 'memfs';
import * as path from 'path';
import * as fs from 'fs';

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

    // Mock fs module
    const originalFs = { ...fs };
    Object.assign(fs, mockFs);

    try {
      const context = new SfdxContext(mockPath);
      const json = context.getProjectJson();
      assert.deepStrictEqual(json?.packageDirectories, [{ path: 'force-app' }]);
    } finally {
      // Restore fs
      Object.assign(fs, originalFs);
    }
  });
});