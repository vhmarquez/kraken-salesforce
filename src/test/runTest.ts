import * as path from 'path';
import Mocha from 'mocha';
import * as glob from 'glob';
import { promisify } from 'util';

const globAsync = promisify(glob.glob);

export async function run(): Promise<void> {
  console.log('Starting test runner...');

  try {
    // Initialize Mocha
    const mocha = new Mocha({
      ui: 'tdd',
      color: true,
      timeout: 10000 // Increase timeout for debugging
    });

    // Resolve test root directory
    const testsRoot = path.resolve(__dirname, '..');
    console.log(`Test root directory: ${testsRoot}`);

    // Find test files
    const files = await globAsync('**/*.test.js', { cwd: testsRoot });
    console.log(`Found test files: ${files.length ? files : 'None'}`);

    if (files.length === 0) {
      console.log('No test files found. Exiting.');
      return;
    }

    // Add test files to Mocha
    files.forEach((f: string) => {
      const testFilePath = path.resolve(testsRoot, f);
      console.log(`Adding test file: ${testFilePath}`);
      mocha.addFile(testFilePath);
    });

    // Run Mocha tests
    await new Promise<void>((resolve, reject) => {
      console.log('Running Mocha tests...');
      mocha.run((failures: number) => {
        console.log(`Mocha tests completed with ${failures} failures.`);
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    });
  } catch (err) {
    console.error(`Test runner error: ${err}`);
    throw err;
  }
}