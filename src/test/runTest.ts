import * as path from 'path';
import Mocha from 'mocha';

function log(message: string): void {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

log('Test runner script loaded');
log('Node version: ' + process.version);
log('Current working directory: ' + process.cwd());
log('Mocha module: ' + require.resolve('mocha'));

export function run(): void {
  log('Starting test execution...');

  try {
    log('Initializing Mocha...');
    const mocha = new Mocha({
      ui: 'tdd',
      color: true,
      timeout: 15000
    });

    const testsRoot = path.resolve(__dirname, '..');
    log(`Test root directory: ${testsRoot}`);

    const testFiles = [
      'suite/extension.test.js',
      'suite/salesforceCli.test.js',
      'suite/sfdxContext.test.js'
    ].map(f => path.resolve(testsRoot, f));

    log('Test files: ' + JSON.stringify(testFiles));

    const fs = require('fs');
    for (const testFile of testFiles) {
      log(`Checking test file: ${testFile}`);
      if (fs.existsSync(testFile)) {
        log(`Adding test file: ${testFile}`);
        mocha.addFile(testFile);
      } else {
        log(`Test file does not exist: ${testFile}`);
      }
    }

    if (mocha.suite.tests.length === 0 && mocha.suite.suites.length === 0) {
      log('No tests added to Mocha. Exiting.');
      return;
    }

    log('Running Mocha tests...');
    mocha.run((failures: number) => {
      log(`Mocha tests completed with ${failures} failures.`);
    })
      .on('start', () => {
        log('Mocha test suite started.');
      })
      .on('end', () => {
        log('Mocha test suite ended.');
      })
      .on('fail', (test, err) => {
        log(`Test failed: ${test.title}: ${err.message}`);
      });
  } catch (err) {
    log(`Test runner error: ${err}`);
  }
}