import * as path from 'path';
import Mocha from 'mocha';
import * as glob from 'glob';
import * as fs from 'fs';
import { promisify } from 'util';

const globAsync = promisify(glob.glob);

export async function run(): Promise<void> {
  console.log('Starting test runner at: ', new Date().toISOString());

  try {
    // Verify Node.js environment
    console.log(`Node version: ${process.version}`);
    console.log(`Current working directory: ${process.cwd()}`);

    // Initialize Mocha
    console.log('Initializing Mocha...');
    const mocha = new Mocha({
      ui: 'tdd',
      color: true,
      timeout: 15000
    });

    // Resolve test root directory
    const testsRoot = path.resolve(__dirname, '..');
    console.log(`Test root directory: ${testsRoot}`);

    // Check if test directory exists
    if (!fs.existsSync(testsRoot)) {
      console.error(`Test root directory does not exist: ${testsRoot}`);
      return;
    } else {
      console.log(`Test root directory exists: ${testsRoot}`);
    }

    // Find test files
    console.log('Searching for test files...');
    const files = await globAsync('**/*.test.js', { cwd: testsRoot });
    console.log(`Found test files: ${files.length ? files.join(', ') : 'None'}`);

    if (files.length === 0) {
      console.log('No test files found. Listing directory contents...');
      const dirContents = fs.readdirSync(testsRoot, { recursive: true });
      console.log(`Directory contents: ${dirContents.join(', ')}`);
      return;
    }

    // Add test files to Mocha
    console.log('Adding test files to Mocha...');
    for (const f of files) {
      const testFilePath = path.resolve(testsRoot, f);
      console.log(`Checking test file: ${testFilePath}`);
      if (fs.existsSync(testFilePath)) {
        console.log(`Adding test file: ${testFilePath}`);
        mocha.addFile(testFilePath);
      } else {
        console.log(`Test file does not exist: ${testFilePath}`);
      }
    }

    // Run Mocha tests
    console.log('Running Mocha tests...');
    await new Promise<void>((resolve, reject) => {
      try {
        mocha.run((failures: number) => {
          console.log(`Mocha tests completed with ${failures} failures.`);
          if (failures > 0) {
            reject(new Error(`${failures} tests failed.`));
          } else {
            resolve();
          }
        });
      } catch (err) {
        console.error(`Mocha execution error: ${err}`);
        reject(err);
      }
    });
  } catch (err) {
    console.error(`Test runner error: ${err}`);
    throw err;
  }
}