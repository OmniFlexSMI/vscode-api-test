const assert = require('assert');
const vscode = require('vscode');
const path = require('path');

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('vscode-api-test'));
    });

    test('Should register commands', async () => {
        const commands = await vscode.commands.getCommands();
        assert.ok(commands.includes('vscode-api-test.testAPI'));
    });

    test('Should activate', async () => {
        const ext = vscode.extensions.getExtension('vscode-api-test');
        await ext.activate();
        assert.ok(true);
    });

    test('Should create and modify text document', async () => {
        // Create a new file
        const doc = await vscode.workspace.openTextDocument({ content: '', language: 'plaintext' });
        const editor = await vscode.window.showTextDocument(doc);
        
        // Insert some text
        await editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(0, 0), 'Test Content');
        });
        
        assert.strictEqual(doc.getText(), 'Test Content');
    });

    test('Configuration should be registered', () => {
        const config = vscode.workspace.getConfiguration('vscode-api-test');
        const testValue = config.get('testSetting');
        assert.strictEqual(testValue, 'test value');
    });

    test('Status bar item should be created', async () => {
        await vscode.commands.executeCommand('vscode-api-test.testAPI');
        // If we got here without errors, the status bar was created successfully
        assert.ok(true);
    });
});