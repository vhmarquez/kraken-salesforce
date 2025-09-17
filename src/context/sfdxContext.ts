import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export interface SfdxProject {
  packageDirectories: Array<{ path: string; default?: boolean }>;
  namespace?: string;
}

export class SfdxContext {
  private projectPath: string | null = null;
  private project: SfdxProject | null = null;

  async initialize(): Promise<SfdxProject> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
      throw new Error('No workspace folder is open');
    }

    this.projectPath = workspaceFolders[0].uri.fsPath;
    const projectFilePath = path.join(this.projectPath, 'sfdx-project.json');

    if (!fs.existsSync(projectFilePath)) {
      throw new Error('sfdx-project.json not found in workspace root');
    }

    const fileContent = fs.readFileSync(projectFilePath, 'utf8');
    this.project = JSON.parse(fileContent) as SfdxProject;

    if (!this.project.packageDirectories || this.project.packageDirectories.length === 0) {
      throw new Error('Invalid sfdx-project.json: No package directories found');
    }

    return this.project;
  }

  getProject(): SfdxProject | null {
    return this.project;
  }

  getProjectPath(): string | null {
    return this.projectPath;
  }
}