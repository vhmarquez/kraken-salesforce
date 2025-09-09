import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  test('Sample test', () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });

  test('Extension should activate', async () => {
    const extension = vscode.extensions.getExtension('yourusername.salesforce-grok-accelerator');
    assert.ok(extension, 'Extension not found');
    await extension?.activate();
    assert.strictEqual(extension?.isActive, true, 'Extension failed to activate');
  });
});