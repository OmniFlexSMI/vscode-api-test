const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('VS Code API Test extension is now active');

    // Test command registration
    let disposable = vscode.commands.registerCommand('vscode-api-test.testAPI', async () => {
        try {
            // Test 1: API Connection
            vscode.window.showInformationMessage('VS Code API Connection Test: SUCCESS');

            // Test 2: Editor Operations
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                await testEditorOperations(editor);
            } else {
                vscode.window.showWarningMessage('No active editor found');
            }

            // Test 3: Event Listeners
            setupEventListeners(context);

            // Test 4: Completion Provider
            registerCompletionProvider(context);

        } catch (error) {
            vscode.window.showErrorMessage(`API Test failed: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function testEditorOperations(editor) {
    try {
        // Test text insertion
        await editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(0, 0), '// VS Code API Test\n');
        });
        vscode.window.showInformationMessage('Editor Operations Test: SUCCESS');
    } catch (error) {
        vscode.window.showErrorMessage(`Editor Operations Test failed: ${error.message}`);
    }
}

function setupEventListeners(context) {
    // Document change listener
    let changeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
        console.log('Document changed:', event.document.uri.toString());
    });

    // Editor selection change listener
    let selectionDisposable = vscode.window.onDidChangeTextEditorSelection(event => {
        console.log('Selection changed in editor:', event.textEditor.document.uri.toString());
    });

    context.subscriptions.push(changeDisposable, selectionDisposable);
    vscode.window.showInformationMessage('Event Listeners Test: SUCCESS');
}

function registerCompletionProvider(context) {
    // Register a simple completion provider
    let provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'javascript' },
        {
            provideCompletionItems(document, position) {
                const simpleCompletion = new vscode.CompletionItem('testCompletion');
                simpleCompletion.detail = 'Test completion item';
                simpleCompletion.documentation = new vscode.MarkdownString('Test documentation');
                return [simpleCompletion];
            }
        }
    );

    context.subscriptions.push(provider);
    vscode.window.showInformationMessage('Completion Provider Test: SUCCESS');
}

function deactivate() {
    console.log('VS Code API Test extension is now deactivated');
}

module.exports = {
    activate,
    deactivate
};
