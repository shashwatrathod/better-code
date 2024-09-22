import * as vscode from 'vscode';

export async function printDefinitionsForActiveEditor() {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return;
  }

  console.log('Inside doc def method.');

  const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
    'vscode.executeDefinitionProvider',
    activeEditor.document.uri,
    activeEditor.selection.active,
  );

  for (const definition of definitions) {
    console.log(definition);
  }
}
