import * as path from 'path';
import Mocha from 'mocha';

export async function run(): Promise<void> {
  console.log('Starting fallback test runner...');

  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
    timeout: 15000
  });

  const testFiles = [
    path.resolve(__dirname, '../suite/extension.test.js'),
    path.resolve(__dirname, '../suite/salesforceCli.test.js'),
    path.resolve(__dirname, '../suite/sfdxContext.test.js')
  ];

  console.log('Test files to run:', testFiles);

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
      console.error(`Error checking test file ${testFile}: ${err}`);
    }
  }

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
}