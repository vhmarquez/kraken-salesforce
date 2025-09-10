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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const salesforceCli_1 = require("../../utils/salesforceCli");
const cp = __importStar(require("child_process"));
const util = __importStar(require("util"));
const exec = util.promisify(cp.exec);
// Mock output channel
class MockOutputChannel {
    constructor() {
        this.name = 'mock';
    }
    append() { }
    appendLine() { }
    clear() { }
    show() { }
    hide() { }
    dispose() { }
    replace() { }
}
suite('SalesforceCli Test Suite', () => {
    test('execute should run sfdx command', async function () {
        // Check if Salesforce CLI is installed
        let cliAvailable = false;
        try {
            const { stdout } = await exec('sfdx --version');
            if (stdout.includes('sfdx-cli')) {
                cliAvailable = true;
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            console.log('Salesforce CLI not found, skipping test:', errorMessage);
            this.skip();
        }
        if (!cliAvailable) {
            console.log('Salesforce CLI version check failed, skipping test');
            this.skip();
        }
        const mockChannel = new MockOutputChannel();
        const sfCli = new salesforceCli_1.SalesforceCli(mockChannel);
        const { stdout } = await sfCli.execute('version');
        assert.ok(stdout.includes('sfdx-cli'), 'Expected sfdx-cli version in stdout');
    });
});
//# sourceMappingURL=salesforceCli.test.js.map