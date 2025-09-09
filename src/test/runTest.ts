import * as path from 'path';
import Mocha from 'mocha';
import * as glob from 'glob';
import { promisify } from 'util';

const globAsync = promisify(glob.glob);

export async function run(): Promise<void> {
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  try {
    const files = await globAsync('**/*.test.js', { cwd: testsRoot });
    console.log(`Found test files: ${files}`); // Debug logging
    files.forEach((f: string) => {
      console.log(`Adding test file: ${f}`); // Debug logging
      mocha.addFile(path.resolve(testsRoot, f));
    });

    return new Promise((resolve, reject) => {
      mocha.run((failures: number) => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error(`Error in test runner: ${err}`);
    return Promise.reject(err);
  }
}