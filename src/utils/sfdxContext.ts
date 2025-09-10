import * as fs from 'fs';
import * as path from 'path';

interface SfdxProject {
  packageDirectories: { path: string }[];
  namespace?: string;
  sfdcLoginUrl?: string;
  sourceApiVersion?: string;
}

export class SfdxContext {
  private projectPath: string;
  private fs: typeof fs;

  constructor(projectPath: string, fsImpl: typeof fs = fs) {
    this.projectPath = projectPath;
    this.fs = fsImpl;
  }

  getProjectJson(): SfdxProject | null {
    const filePath = path.join(this.projectPath, 'sfdx-project.json');
    if (this.fs.existsSync(filePath)) {
      const content = this.fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as SfdxProject;
    }
    return null;
  }

  getMetadataFiles(): string[] {
    const metadataDir = path.join(this.projectPath, 'force-app', 'main', 'default');
    if (this.fs.existsSync(metadataDir)) {
      return this.fs.readdirSync(metadataDir, { recursive: true }) as string[];
    }
    return [];
  }
}