module.exports = {
  root: true,
  extends: ['airbnb', 'airbnb/hooks'],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/no-unresolved': 0,
    'no-unused-vars': [2, {vars: 'all', args: 'after-used'}],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
  },
};
