declare module 'glob' {
  export interface GlobOptions {
    cwd?: string;
  }
  export function glob(pattern: string, options?: GlobOptions, cb?: (err: Error | null, matches: string[]) => void): void;
}