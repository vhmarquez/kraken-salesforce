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
const sfdxContext_1 = require("../../utils/sfdxContext");
const memfs_1 = require("memfs");
const path = __importStar(require("path"));
// Mock fs module
const createMockFs = () => {
    const vol = new memfs_1.Volume();
    const mockFs = (0, memfs_1.createFsFromVolume)(vol);
    return {
        existsSync: (filePath) => mockFs.existsSync(filePath),
        readFileSync: (filePath, encoding) => mockFs.readFileSync(filePath, encoding)
    };
};
suite('SfdxContext Test Suite', () => {
    test('getProjectJson should parse sfdx-project.json', () => {
        const mockFs = createMockFs();
        const mockPath = '/mock-project';
        mockFs.mkdirSync?.(mockPath, { recursive: true });
        mockFs.writeFileSync?.(path.join(mockPath, 'sfdx-project.json'), JSON.stringify({ packageDirectories: [{ path: 'force-app' }] }));
        // Create SfdxContext with mocked fs
        const context = new sfdxContext_1.SfdxContext(mockPath, mockFs);
        const json = context.getProjectJson();
        assert.deepStrictEqual(json?.packageDirectories, [{ path: 'force-app' }]);
    });
});
//# sourceMappingURL=sfdxContext.test.js.map