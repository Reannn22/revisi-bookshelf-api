import globalVariables from 'globals';
import jsPlugin from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    options: { sourceType: 'module' },
    exclude: ['node_modules/', 'package.json', 'package-lock.json']
  },
  {
    options: { globals: globalVariables.node }
  },
  jsPlugin.configs.suggested,
];
