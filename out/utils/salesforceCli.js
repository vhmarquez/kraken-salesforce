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
exports.SalesforceCli = void 0;
const cp = __importStar(require("child_process"));
const util = __importStar(require("util"));
const exec = util.promisify(cp.exec);
class SalesforceCli {
    constructor(outputChannel) {
        this.outputChannel = outputChannel;
    }
    async execute(command, cliCommand = 'sfdx') {
        try {
            const { stdout, stderr } = await exec(`${cliCommand} ${command}`);
            this.outputChannel.appendLine(`CLI command: ${cliCommand} ${command}`);
            this.outputChannel.appendLine(`Stdout: ${stdout}`);
            if (stderr) {
                this.outputChannel.appendLine(`Stderr: ${stderr}`);
            }
            return { stdout, stderr };
        }
        catch (error) {
            this.outputChannel.appendLine(`Error executing ${cliCommand} ${command}: ${error.message}`);
            throw error;
        }
    }
}
exports.SalesforceCli = SalesforceCli;
//# sourceMappingURL=salesforceCli.js.map