import * as fs from 'fs';
import * as path from 'path';

export class SfdxContext {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  getProjectJson(): any | null {
    const filePath = path.join(this.projectPath, 'sfdx-project.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
    return null;
  }

  // Placeholder for metadata parsing (expand in Phase 1)
  getMetadataFiles(): string[] {
    // Scan force-app/main/default for .cls, .xml, etc.
    const metadataDir = path.join(this.projectPath, 'force-app', 'main', 'default');
    if (fs.existsSync(metadataDir)) {
      return fs.readdirSync(metadataDir, { recursive: true }) as string[];
    }
    return [];
  }
}