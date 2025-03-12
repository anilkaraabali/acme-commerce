import type { Linter } from 'eslint';

const config: Linter.Config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:perfectionist/recommended-natural',
    'plugin:tailwindcss/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
    'plugin:vitest/recommended',
    'plugin:storybook/recommended',
  ],
  globals: {
    JSX: true,
    React: true,
  },
  ignorePatterns: ['node_modules', 'dist', '!/.storybook'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'perfectionist',
    'jest-dom',
    'testing-library',
    'tailwindcss',
  ],
  root: true,
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'with-single-extends',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_.*?$',
        ignoreRestSiblings: false,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'import/newline-after-import': 'error',
    'max-params': 'error',
    'no-console': 'warn',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
    ],
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'testing-library/no-node-access': [
      'error',
      { allowContainerFirstChild: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

export default config;
