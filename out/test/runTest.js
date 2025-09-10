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
console.log('Test runner script loaded at:', new Date().toISOString());
console.log('Node version:', process.version);
console.log('Current working directory:', process.cwd());
console.log('Mocha module:', require.resolve('mocha'));
async function run() {
    console.log('Starting test execution...');
    try {
        console.log('Initializing Mocha...');
        const mocha = new mocha_1.default({
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
                const fs = require('fs');
                if (fs.existsSync(testFile)) {
                    console.log(`Adding test file: ${testFile}`);
                    mocha.addFile(testFile);
                }
                else {
                    console.log(`Test file does not exist: ${testFile}`);
                }
            }
            catch (err) {
                console.error(`Error checking test file ${testFile}:`, err);
            }
        }
        if (mocha.suite.tests.length === 0 && mocha.suite.suites.length === 0) {
            console.log('No tests added to Mocha. Exiting.');
            return;
        }
        console.log('Running Mocha tests...');
        await new Promise((resolve) => {
            mocha.run((failures) => {
                console.log(`Mocha tests completed with ${failures} failures.`);
                resolve();
            }).on('start', () => {
                console.log('Mocha test suite started.');
            }).on('end', () => {
                console.log('Mocha test suite ended.');
            }).on('fail', (test, err) => {
                console.error(`Test failed: ${test.title}: ${err.message}`);
            });
        });
    }
    catch (err) {
        console.error('Test runner error:', err);
    }
}
//# sourceMappingURL=runTest.js.map