import * as path from 'path';
import Mocha from 'mocha';
import * as glob from 'glob';
import * as fs from 'fs';
import { promisify } from 'util';

const globAsync = promisify(glob.glob);

console.log('Test runner script loaded at:', new Date().toISOString());

export async function run(): Promise<void> {
  console.log('Starting test execution...');
  console.log('Node version:', process.version);
  console.log('Current working directory:', process.cwd());

  try {
    console.log('Initializing Mocha...');
    const mocha = new Mocha({
      ui: 'tdd',
      color: true,
      timeout: 15000
    });

    const testsRoot = path.resolve(__dirname, '../suite');
    console.log(`Test root directory: ${testsRoot}`);

    if (!fs.existsSync(testsRoot)) {
      console.error(`Test root directory does not exist: ${testsRoot}`);
      return;
    }
    console.log(`Test root directory exists: ${testsRoot}`);

    console.log('Searching for test files...');
    const files = await globAsync('*.test.js', { cwd: testsRoot });
    console.log(`Found test files: ${files.length ? files.join(', ') : 'None'}`);

    if (files.length === 0) {
      console.log('No test files found. Listing directory contents...');
      try {
        const dirContents = fs.readdirSync(testsRoot, { recursive: true });
        console.log(`Directory contents: ${dirContents.length ? dirContents.join(', ') : 'None'}`);
      } catch (dirErr) {
        console.error(`Error reading directory: ${dirErr}`);
      }
      return;
    }

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

    console.log('Running Mocha tests...');
    try {
      await new Promise<void>((resolve) => {
        mocha.run((failures: number) => {
          console.log(`Mocha tests completed with ${failures} failures.`);
          resolve();
        });
      });
    } catch (err) {
      console.error(`Mocha execution error: ${err}`);
    }
  } catch (err) {
    console.error(`Test runner error: ${err}`);
  }
}