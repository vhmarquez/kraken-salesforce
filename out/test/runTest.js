"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const path = __importStar(require("path"));
const mocha_1 = __importDefault(require("mocha"));
function log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
}
log('Test runner script loaded');
log('Node version: ' + process.version);
log('Current working directory: ' + process.cwd());
log('Mocha module: ' + require.resolve('mocha'));
function run() {
    log('Entering run function...');
    let mocha = null;
    try {
        log('Creating Mocha instance...');
        mocha = new mocha_1.default({
            ui: 'tdd',
            color: true,
            timeout: 15000
        });
        log('Mocha instance created');
    }
    catch (err) {
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
            }
            else {
                log(`Test file does not exist: ${testFile}`);
            }
        }
        catch (err) {
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
        mocha.run((failures) => {
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
    }
    catch (err) {
        log(`Mocha run error: ${err}`);
    }
}
//# sourceMappingURL=runTest.js.map