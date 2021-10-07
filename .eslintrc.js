module.exports = {
    root: true,
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:react/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        indent: 0,
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'no-unused-vars': 0,
        'import/no-named-as-default': 0,
        'import/no-named-as-default-member': 0,
        'arrow-parens': 0,
        'comma-dangle': ['error', 'never'],
        'max-len': ['error', { code: 160 }],
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'no-console': 0,
        semi: ['error', 'always'],
        'space-before-function-paren': 0,
        'no-trailing-spaces': 'error',
        'brace-style': 'error',
        'arrow-spacing': 'error',
        'space-infix-ops': 'error',
        'block-spacing': 'error',
        'comma-spacing': ['error', { before: false, after: true }],
        'comma-style': [2, 'last', { exceptions: { CallExpression: false } }],
        'lines-between-class-members': ['error', 'always'],
        'no-var': 'error',
        'object-curly-spacing': [2, 'always'],
        'space-before-blocks': [
            'error',
            { functions: 'always', keywords: 'always', classes: 'always' }
        ],
        'keyword-spacing': [2, { before: true, after: true }],
        'key-spacing': [2, { beforeColon: false, afterColon: true }],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': ['warn'],
        camelcase: 2,
        quotes: [2, 'single']
    }
};
