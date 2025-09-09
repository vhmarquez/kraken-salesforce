"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesforceCli = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class SalesforceCli {
    constructor(outputChannel) {
        this.outputChannel = outputChannel;
    }
    async execute(command) {
        this.outputChannel.appendLine(`Executing Salesforce CLI: sfdx ${command}`);
        try {
            const { stdout, stderr } = await execAsync(`sfdx ${command}`);
            this.outputChannel.appendLine(`CLI Output: ${stdout}`);
            if (stderr) {
                this.outputChannel.appendLine(`CLI Error: ${stderr}`);
            }
            return { stdout, stderr };
        }
        catch (error) {
            this.outputChannel.appendLine(`CLI Execution Error: ${error}`);
            throw error;
        }
    }
}
exports.SalesforceCli = SalesforceCli;
//# sourceMappingURL=salesforceCli.js.map