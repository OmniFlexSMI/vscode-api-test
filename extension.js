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
            await testEditorOperations();

            // Test 3: Event Listeners
            setupEventListeners(context);

            // Test 4: Completion Provider
            registerCompletionProvider(context);

            // Test 5: File System Operations
            await testFileSystemOperations();

            // Test 6: Configuration Test
            testConfiguration();

            // Test 7: Status Bar
            setupStatusBar(context);

        } catch (error) {
            vscode.window.showErrorMessage(`API Test failed: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

async function testEditorOperations() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        // Create a new file if no editor is active
        const doc = await vscode.workspace.openTextDocument({ content: '', language: 'plaintext' });
        await vscode.window.showTextDocument(doc);
        vscode.window.showInformationMessage('Created new file for testing');
        return;
    }

    try {
        // Test text insertion
        await editor.edit(editBuilder => {
            const position = editor.selection.active;
            editBuilder.insert(position, '// VS Code API Test\n');
        });

        // Test selection manipulation
        const position = editor.selection.active;
        editor.selection = new vscode.Selection(position, position.translate(0, 18));

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

    // File system watcher
    let watcher = vscode.workspace.createFileSystemWatcher('**/*.{js,json}');
    watcher.onDidChange(uri => console.log('File changed:', uri.toString()));
    watcher.onDidCreate(uri => console.log('File created:', uri.toString()));
    watcher.onDidDelete(uri => console.log('File deleted:', uri.toString()));

    context.subscriptions.push(changeDisposable, selectionDisposable, watcher);
    vscode.window.showInformationMessage('Event Listeners Test: SUCCESS');
}

function registerCompletionProvider(context) {
    // Register a simple completion provider
    let provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: 'javascript' },
        {
            provideCompletionItems(document, position) {
                const snippetCompletion = new vscode.CompletionItem('testFunction');
                snippetCompletion.insertText = new vscode.SnippetString('function ${1:name}() {\n\t$0\n}');
                snippetCompletion.documentation = new vscode.MarkdownString('Test snippet for function creation');

                const simpleCompletion = new vscode.CompletionItem('testLog');
                simpleCompletion.insertText = 'console.log();';
                simpleCompletion.documentation = 'Simple console.log snippet';

                return [snippetCompletion, simpleCompletion];
            }
        }
    );

    context.subscriptions.push(provider);
    vscode.window.showInformationMessage('Completion Provider Test: SUCCESS');
}

async function testFileSystemOperations() {
    try {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            throw new Error('No workspace folder open');
        }

        const testFolderUri = vscode.Uri.joinPath(workspaceFolders[0].uri, 'test-folder');
        const testFileUri = vscode.Uri.joinPath(testFolderUri, 'test.txt');

        // Create test folder
        await vscode.workspace.fs.createDirectory(testFolderUri);

        // Create and write to test file
        await vscode.workspace.fs.writeFile(testFileUri, Buffer.from('Test content'));

        // Read file content
        const content = await vscode.workspace.fs.readFile(testFileUri);
        console.log('File content:', content.toString());

        vscode.window.showInformationMessage('File System Operations Test: SUCCESS');
    } catch (error) {
        vscode.window.showErrorMessage(`File System Operations Test failed: ${error.message}`);
    }
}

function testConfiguration() {
    const config = vscode.workspace.getConfiguration('vscode-api-test');
    const testValue = config.get('testSetting', 'default');
    console.log('Test configuration value:', testValue);
    vscode.window.showInformationMessage('Configuration Test: SUCCESS');
}

function setupStatusBar(context) {
    const statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
    );
    statusBarItem.text = "$(beaker) API Test";
    statusBarItem.tooltip = "Click to run API tests";
    statusBarItem.command = 'vscode-api-test.testAPI';
    statusBarItem.show();

    context.subscriptions.push(statusBarItem);
    vscode.window.showInformationMessage('Status Bar Test: SUCCESS');
}

function deactivate() {
    console.log('VS Code API Test extension is now deactivated');
}

module.exports = {
    activate,
    deactivate
};
