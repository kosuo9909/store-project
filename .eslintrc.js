module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        node: true,
        jest: true,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    // 'linebreak-style': ['error', 'windows'],
    'react/react-in-jsx-scope': 'off',
    quotes: ['error', 'single'],
    'react/prop-types': 'off',
    semi: ['error', 'always'],
    eqeqeq: 'error', // enforce the use of === and !==
    'no-var': 'error', // disallow the use of var
    'prefer-const': 'error', // require const declarations for variables that are never reassigned after declared
    '@typescript-eslint/no-explicit-any': 'error', // disallow usage of the any type (TypeScript specific)
  },
};
