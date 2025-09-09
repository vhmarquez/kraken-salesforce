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
const util_1 = require("util");
const globAsync = (0, util_1.promisify)(glob.glob);
async function run() {
    console.log('Starting test runner...');
    try {
        // Initialize Mocha
        const mocha = new mocha_1.default({
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
        files.forEach((f) => {
            const testFilePath = path.resolve(testsRoot, f);
            console.log(`Adding test file: ${testFilePath}`);
            mocha.addFile(testFilePath);
        });
        // Run Mocha tests
        await new Promise((resolve, reject) => {
            console.log('Running Mocha tests...');
            mocha.run((failures) => {
                console.log(`Mocha tests completed with ${failures} failures.`);
                if (failures > 0) {
                    reject(new Error(`${failures} tests failed.`));
                }
                else {
                    resolve();
                }
            });
        });
    }
    catch (err) {
        console.error(`Test runner error: ${err}`);
        throw err;
    }
}
//# sourceMappingURL=runTest.js.map