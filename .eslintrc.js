const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
        'no-underscore-dangle': ['error', { allow: ['_t'] }],
        '@typescript-eslint/naming-convention': ['warn'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        'import/prefer-default-export': ['off'],
        'react/jsx-props-no-spreading': ['off'],
        'react/require-default-props': [0], //not working for ts
        'react/destructuring-assignment': ['off'], // disabled, because sometimes we need to pass 'data-cy' prop which cannot be destructured
        'import/no-unresolved': ['off'],
        'no-param-reassign': ['error', { props: false }],
        'consistent-return': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/indent': ['off'],
        'react/jsx-filename-extension': ['off'],
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
