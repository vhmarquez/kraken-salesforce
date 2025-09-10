import * as path from 'path';
import Mocha from 'mocha';

console.log('Test runner script loaded at:', new Date().toISOString());
console.log('Node version:', process.version);
console.log('Current working directory:', process.cwd());
console.log('Mocha module:', require.resolve('mocha'));

export async function run(): Promise<void> {
  console.log('Starting test execution...');

  try {
    console.log('Initializing Mocha...');
    const mocha = new Mocha({
      ui: 'tdd',
      color: true,
      timeout: 15000
    });

    const testFiles = [
      'suite/extension.test.js',
      'suite/salesforceCli.test.js',
      'suite/sfdxContext.test.js'
    ].map(f => path.resolve(__dirname, '..', f));

    console.log('Test files:', testFiles);

    for (const testFile of testFiles) {
      console.log(`Checking test file: ${testFile}`);
      try {
        if (require('fs').existsSync(testFile)) {
          console.log(`Adding test file: ${testFile}`);
          mocha.addFile(testFile);
        } else {
          console.log(`Test file does not exist: ${testFile}`);
        }
      } catch (err) {
        console.error(`Error checking test file ${testFile}:`, err);
      }
    }

    console.log('Running Mocha tests...');
    await new Promise<void>((resolve) => {
      mocha.run((failures: number) => {
        console.log(`Mocha tests completed with ${failures} failures.`);
        resolve();
      }).on('fail', (test, err) => {
        console.error(`Test failed: ${test.title}: ${err.message}`);
      }).on('start', () => {
        console.log('Mocha test suite started.');
      }).on('end', () => {
        console.log('Mocha test suite ended.');
      });
    });
  } catch (err) {
    console.error(`Test runner error:`, err);
  }
}