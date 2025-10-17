import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { browser } from 'globals';
import ts from 'typescript-eslint';

export default defineConfig(
  {
    extends: [
      js.configs.recommended,
      ts.configs.strictTypeChecked,
      ts.configs.stylisticTypeChecked,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.recommended,
      prettier,
    ],
    ignores: ['dist/**'],
    languageOptions: {
      globals: browser,
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': ['error'],
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_$' }],
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/newline-after-import': ['error'],
      'import/no-named-as-default-member': ['off'],
      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          alphabetize: { caseInsensitive: true, order: 'asc' },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'object', 'unknown', 'type', 'index'],
          named: true,
          pathGroups: [{ group: 'index', pattern: '*.scss', patternOptions: { matchBase: true } }],
          warnOnUnassignedImports: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['off'],
    },
  },
);
