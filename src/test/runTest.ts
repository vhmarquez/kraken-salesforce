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
  log('Entering run function...');

  let mocha: Mocha | null = null;
  try {
    log('Creating Mocha instance...');
    mocha = new Mocha({
      ui: 'tdd',
      color: true,
      timeout: 15000
    });
    log('Mocha instance created');
  } catch (err) {
    log(`Mocha initialization error: ${err}`);
    return;
  }

  const testFiles = [
    'suite/extension.test.js',
    'suite/salesforceCli.test.js',
    'suite/sfdxContext.test.js'
  ].map(f => path.resolve(__dirname, '..', f));

  log('Test files: ' + JSON.stringify(testFiles));

  const fs = require('fs');
  for (const testFile of testFiles) {
    log(`Processing test file: ${testFile}`);
    try {
      log(`Checking if test file exists: ${testFile}`);
      if (fs.existsSync(testFile)) {
        log(`Adding test file to Mocha: ${testFile}`);
        mocha.addFile(testFile);
        log(`Test file added: ${testFile}`);
      } else {
        log(`Test file does not exist: ${testFile}`);
      }
    } catch (err) {
      log(`Error processing test file ${testFile}: ${err}`);
    }
  }

  log(`Mocha suite state: tests=${mocha.suite.tests.length}, suites=${mocha.suite.suites.length}`);
  if (mocha.suite.tests.length === 0 && mocha.suite.suites.length === 0) {
    log('No tests added to Mocha. Exiting.');
    return;
  }

  log('Running Mocha tests...');
  try {
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
    log(`Mocha run error: ${err}`);
  }
}