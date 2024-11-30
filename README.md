# VS Code API Test Extension

This extension tests VS Code API connectivity and basic functionality.

## Features

Tests the following VS Code API functionalities:

1. **API Connection Test**
   - Verifies basic API connectivity
   - Shows success message on connection

2. **Editor Operations Test**
   - Tests text insertion
   - Validates editor manipulation capabilities

3. **Event Listeners Test**
   - Document change events
   - Selection change events
   - Logs events to console

4. **Completion Provider Test**
   - Registers a basic completion provider
   - Provides test completion items for JavaScript files

## Usage

1. Press `F5` to run the extension in a new VS Code window
2. Open the command palette (`Ctrl+Shift+P`)
3. Run the command "Test VS Code API"
4. Check the output for test results

## Requirements

- VS Code 1.80.0 or higher

## Error Handling

The extension includes comprehensive error handling:
- Each test component runs in try-catch blocks
- Descriptive error messages are shown for each failure
- Console logging for debugging purposes

## Extension Settings

This extension doesn't contribute any settings.

## Known Issues

None at this time.

## Release Notes

### 0.0.1

Initial release of VS Code API Test Extension
