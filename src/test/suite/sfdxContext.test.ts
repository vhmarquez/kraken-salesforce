import * as assert from 'assert';
import { SfdxContext } from '../../utils/sfdxContext';
import { Volume, createFsFromVolume } from 'memfs';
import * as path from 'path';

suite('SfdxContext Test Suite', () => {
  test('getProjectJson should parse sfdx-project.json', () => {
    const vol = new Volume();
    const fs = createFsFromVolume(vol);
    const mockPath = '/mock-project';
    fs.mkdirSync(mockPath, { recursive: true });
    fs.writeFileSync(
      path.join(mockPath, 'sfdx-project.json'),
      JSON.stringify({ packageDirectories: [{ path: 'force-app' }] })
    );

    // Mock fs with memfs
    const originalFs = require('fs');
    require('fs').__proto__ = fs;

    const context = new SfdxContext(mockPath);
    const json = context.getProjectJson();
    assert.deepStrictEqual(json?.packageDirectories, [{ path: 'force-app' }]);

    // Restore fs
    require('fs').__proto__ = originalFs;
  });
});