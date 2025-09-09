import * as assert from 'assert';
import { SfdxContext } from '../../utils/sfdxContext';
import { Volume, create } from 'memfs';
import * as path from 'path';

suite('SfdxContext Test Suite', () => {
  test('getProjectJson should parse sfdx-project.json', () => {
    const vol = create() as Volume;
    const mockPath = '/mock-project';
    vol.mkdirSync(mockPath, { recursive: true });
    vol.writeFileSync(
      path.join(mockPath, 'sfdx-project.json'),
      JSON.stringify({ packageDirectories: [{ path: 'force-app' }] })
    );

    // Mock fs with memfs
    const originalFs = require('fs');
    require('fs').__proto__ = vol;

    const context = new SfdxContext(mockPath);
    const json = context.getProjectJson();
    assert.deepStrictEqual(json?.packageDirectories, [{ path: 'force-app' }]);

    // Restore fs
    require('fs').__proto__ = originalFs;
  });
});