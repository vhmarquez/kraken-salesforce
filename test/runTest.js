const path = require('path');
const Mocha = require('mocha');
const glob = require('glob');
const esbuild = require('esbuild');

// Build test files with esbuild before running
esbuild.buildSync({
  entryPoints: ['test/**/*.ts'],
  outdir: 'out/test',
  platform: 'node',
  format: 'cjs',
  sourcemap: true,
  external: ['vscode', 'mocha', 'chai'],
  bundle: true,
});

const mocha = new Mocha({
  ui: 'tdd',
  color: true,
  timeout: 5000,
});

const testsRoot = path.resolve(__dirname, '..');

glob('out/test/**/*.test.js', { cwd: testsRoot }, (err, files) => {
  if (err) {
    console.error('Error finding tests:', err);
    process.exit(1);
  }

  if (files.length === 0) {
    console.warn('No test files found in out/test/');
    process.exit(0);
  }

  files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

  mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0;
  });
});