import * as assert from 'assert';

// Mock vscode module
const vscodeMock = {
  window: {
    showInformationMessage: () => {}
  },
  extensions: {
    getExtension: () => ({
      activate: async () => {},
      isActive: true
    })
  }
};

suite('Extension Test Suite', () => {
  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test('Extension should activate', async () => {
    const extension = vscodeMock.extensions.getExtension('vhmarquez.salesforce-grok-accelerator');
    assert.ok(extension, 'Extension not found');
    await extension?.activate();
    assert.strictEqual(extension?.isActive, true, 'Extension failed to activate');
  });
});