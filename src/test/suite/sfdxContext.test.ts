import * as assert from 'assert';
import { SfdxContext } from '../../utils/sfdxContext';
import { Volume, createFsFromVolume } from 'memfs';
import * as path from 'path';

// Mock fs module
const createMockFs = () => {
  const vol = new Volume();
  const mockFs = createFsFromVolume(vol);
  return {
    existsSync: (filePath: string) => mockFs.existsSync(filePath),
    readFileSync: (filePath: string, encoding: string) => mockFs.readFileSync(filePath, encoding)
  };
};

suite('SfdxContext Test Suite', () => {
  test('getProjectJson should parse sfdx-project.json', () => {
    const mockFs = createMockFs();
    const mockPath = '/mock-project';
    mockFs.mkdirSync?.(mockPath, { recursive: true });
    mockFs.writeFileSync?.(
      path.join(mockPath, 'sfdx-project.json'),
      JSON.stringify({ packageDirectories: [{ path: 'force-app' }] })
    );

    // Create SfdxContext with mocked fs
    const context = new SfdxContext(mockPath, mockFs);
    const json = context.getProjectJson();
    assert.deepStrictEqual(json?.packageDirectories, [{ path: 'force-app' }]);
  });
});