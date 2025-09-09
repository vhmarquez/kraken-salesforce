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
async function run() {
    console.log('Starting fallback test runner...');
    const mocha = new mocha_1.default({
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
            }
            else {
                console.log(`Test file does not exist: ${testFile}`);
            }
        }
        catch (err) {
            console.error(`Error checking test file ${testFile}: ${err}`);
        }
    }
    console.log('Running Mocha tests...');
    await new Promise((resolve, reject) => {
        try {
            mocha.run((failures) => {
                console.log(`Mocha tests completed with ${failures} failures.`);
                if (failures > 0) {
                    reject(new Error(`${failures} tests failed.`));
                }
                else {
                    resolve();
                }
            });
        }
        catch (err) {
            console.error(`Mocha execution error: ${err}`);
            reject(err);
        }
    });
}
//# sourceMappingURL=runTestFallback.js.map