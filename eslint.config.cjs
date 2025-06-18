const eslintPluginTs = require('@typescript-eslint/eslint-plugin');
const parserTs = require('@typescript-eslint/parser');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
];