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
const glob = __importStar(require("glob"));
const fs = __importStar(require("fs"));
const util_1 = require("util");
const globAsync = (0, util_1.promisify)(glob.glob);
console.log('Test runner script loaded at:', new Date().toISOString());
async function run() {
    console.log('Starting test execution...');
    console.log('Node version:', process.version);
    console.log('Current working directory:', process.cwd());
    try {
        console.log('Initializing Mocha...');
        const mocha = new mocha_1.default({
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
            }
            catch (dirErr) {
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
            }
            else {
                console.log(`Test file does not exist: ${testFilePath}`);
            }
        }
        console.log('Running Mocha tests...');
        try {
            await new Promise((resolve) => {
                mocha.run((failures) => {
                    console.log(`Mocha tests completed with ${failures} failures.`);
                    resolve();
                });
            });
        }
        catch (err) {
            console.error(`Mocha execution error: ${err}`);
        }
    }
    catch (err) {
        console.error(`Test runner error: ${err}`);
    }
}
//# sourceMappingURL=runTest.js.map