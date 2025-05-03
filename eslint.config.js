import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import { env } from 'process';

export default [
  {
    ignores: ['dist/**', '**/*.js'], // 👈 hier
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly', // Fix "console is not defined"
        process: 'readonly', // Fix "process is not defined"
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },

    plugins: {
      '@typescript-eslint': ts,
      prettier: prettier,
      import: importPlugin,
    },
    rules: {
      'no-dupe-class-members': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];
