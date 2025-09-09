import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      globals: {
        suite: 'readonly',
        test: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        console: 'readonly',
        process: 'readonly' // Add Node.js process
      }
    },
    plugins: {
      '@typescript-eslint': ts
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  },
  {
    files: ['src/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'off'
    }
  }
];