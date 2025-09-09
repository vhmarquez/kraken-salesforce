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

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  getProjectJson(): SfdxProject | null {
    const filePath = path.join(this.projectPath, 'sfdx-project.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as SfdxProject;
    }
    return null;
  }

  getMetadataFiles(): string[] {
    const metadataDir = path.join(this.projectPath, 'force-app', 'main', 'default');
    if (fs.existsSync(metadataDir)) {
      return fs.readdirSync(metadataDir, { recursive: true }) as string[];
    }
    return [];
  }
}